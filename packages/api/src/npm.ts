import { get } from "@tomato-js/request";
import { PQueue } from "@tomato-js/async";
import { Github, GithubOptions } from "./github";
import * as cheerio from "cheerio";
type GetNpmDependentsOptions = { packageName: string; pages?: number; concurrency?: number };
type GetDependentsInfoOptions = GetNpmDependentsOptions & GithubOptions;
type Info = {
  [key: string]: {
    forks: number;
    stars: number;
    watchers: number;
    url: string;
  };
};
type Infos = Info[];
type SortInfosOptions = {
  infos: Infos;
  sortBy?: "stars" | "forks" | "watchers";
};
/**
 * 获取npm包被依赖列表
 *
 * 新增于v0.0.21
 *
 * 脚本举例
 * ```
 *   import { getNpmDependents } from '@tomato-js/api'
 *   const deps = await getNpmDependents({
 *     packageName: "mrgx",//包名称
 *     pages: "10",//查询页码总数
 *     concurrency: "40",//请求队列并发数，越小则越慢
 *   });
 *   //依赖mrgx的npm包列表
 *   //['nest-demo','http-mockjs',...]
 * ```
 *
 * @param settings - 配置
 * @param settings.packageName - 包名称
 * @param settings.pages - 要查询的总页数，默认为10
 * @param settings.concurrency - 请求队列的并发数，默认为40
 * @returns 依赖该包的队列
 */
async function getNpmDependents({ packageName, pages = 10, concurrency = 40 }: GetNpmDependentsOptions) {
  const dependents: string[] = [];
  const visited = new Set();
  let page = 0;
  const queue = new PQueue({
    autoStart: true,
    concurrency
  });
  const next = async (page: number) => {
    const offset = page * 36;
    const url = `https://npmjs.com/browse/depended/${packageName}?offset=${offset}`;
    const { data } = await get(url);
    const $ = cheerio.load(data);
    $('a[href^="/package/"]').each((_, el) => {
      const dependant = ($(el) as any).attr("href").slice("/package/".length);
      if (dependant !== packageName && !visited.has(dependant)) {
        dependents.push(dependant);
        visited.add(dependant);
      }
    });
  };
  while (page < pages) {
    queue.add(async () => {
      await next(page);
    });
    page++;
  }
  await queue.onIdle();
  return dependents.filter(item => item !== "undefined");
}
/**
 * 获取npm包完整信息
 *
 * 新增于v0.0.21
 *
 * 脚本举例
 * ```
 *   import { getNpmRegistryInfo } from '@tomato-js/api'
 *   const deps = await getNpmRegistryInfo('mrgx');
 * ```
 *
 * @param packageName - 包名称
 * @returns 包完整信息
 */
async function getNpmRegistryInfo(packageName: string) {
  const { data } = await get(`https://registry.npmjs.org/${packageName}`);
  return data;
}
/**
 * 获取npm包最新版本
 *
 * 新增于v0.0.21
 *
 * 脚本举例
 * ```
 *   import { getNpmLatestVersion } from '@tomato-js/api'
 *   const version = await getNpmRegistryInfo('mrgx');
 * ```
 *
 * @param packageName - 包名称
 * @returns 包最新版本号
 */
async function getNpmLatestVersion(packageName: string) {
  const info = await getNpmRegistryInfo(packageName);
  const { versions } = info;
  // 取出最近的一个版本
  return Object.keys(versions).reverse()[0];
}
/**
 * 获取npm包依赖包列表完整信息
 *
 * 新增于v0.0.21
 *
 * 脚本举例
 * ```
 *   import { getDependentsInfo } from '@tomato-js/api'
 *   const info = await getNpmRegistryInfo({
 *     packageName:'mrgx',
 *     pages: 10,
 *     token:'Your github token'
 *   });
 *   // [
 *   //   {
 *   //     '@atomist/sdm-core':
 *   //       { forks: 3,
 *   //         stars: 6,
 *   //         watchers: 6,
 *   //         url: 'github.com/atomist/sdm-core'
 *   //       }
 *   //    }
 *   // ]
 * ```
 *
 * @param settings - 配置
 * @param settings.packageName - 包名称
 * @param settings.token - github 的token
 * @param settings.pages - 要查询的总页数，默认为10
 * @param settings.concurrency - 请求队列的并发数，默认为40
 * @returns 依赖该包的npm包详细信息
 */
async function getDependentsInfo({ packageName, pages = 10, concurrency = 40, token }: GetDependentsInfoOptions) {
  const urlRegex = /github.com\/([^/])+\/[^/]+/g;
  const githubAPI = new Github({
    token
  });
  const depArr = await getNpmDependents({
    packageName,
    pages,
    concurrency
  });
  const queue = new PQueue({
    autoStart: true,
    concurrency
  });
  const dependentsInfoList: any = [];
  const next = async (index: number) => {
    let org, repo, repoOrgArr, githubObj, gitUrl;
    if (!depArr[index]) {
      return;
    }
    const resp = await getNpmRegistryInfo(depArr[index]);
    if (resp.repository && resp.repository.url) {
      gitUrl = resp.repository.url.match(urlRegex);
      if (gitUrl) {
        gitUrl = gitUrl[0].replace(/(\.git)/g, "");
        repoOrgArr = gitUrl.split("github.com")[1].split("/");
        org = repoOrgArr[1];
        repo = repoOrgArr[2];
        githubObj = await githubAPI.getRepoData(org, repo);
        dependentsInfoList.push({
          [depArr[index]]: {
            stars: githubObj ? githubObj.stargazers : 0,
            url: gitUrl || "undefined"
          }
        });
      }
    }
  };
  depArr.map((dep: string, index: number) => {
    queue.add(async () => {
      await next(index);
    });
  });
  await queue.onIdle();
  return dependentsInfoList;
}
/**
 * 获取npm包依赖包，按star数量排序
 *
 * 新增于v0.0.21
 *
 * 脚本举例
 * ```
 *   import { getSortedDependentsByStar } from '@tomato-js/api'
 *   const info = await getSortedDependentsByStar({
 *     packageName:'mrgx',
 *     pages: 10,
 *     token:'Your github token'
 *   });
 *   // [
 *   //   {
 *   //     '@atomist/sdm-core':
 *   //       { forks: 3,
 *   //         stars: 6,
 *   //         watchers: 6,
 *   //         url: 'github.com/atomist/sdm-core'
 *   //       }
 *   //    }
 *   // ]
 * ```
 *
 * @param settings - 配置
 * @param settings.packageName - 包名称
 * @param settings.token - github 的token
 * @param settings.pages - 要查询的总页数，默认为10
 * @param settings.concurrency - 请求队列的并发数，默认为40
 * @returns 依赖该包的npm包详细信息
 */
async function getSortedDependentsByStar({ packageName, pages = 10, concurrency = 40, token }: GetDependentsInfoOptions) {
  const deps = await getDependentsInfo({ packageName, pages, concurrency, token });
  const sorted = _sortInfos({ infos: deps });
  return sorted;
}
// 排序
function _sortInfos(options: SortInfosOptions) {
  const { infos, sortBy = "stars" } = options;
  return Object.values(infos).sort((a: any, b: any) => {
    return (Object.values(b)[0] as any)[sortBy] - (Object.values(a)[0] as any)[sortBy];
  });
}
export { getNpmDependents, getNpmRegistryInfo, getNpmLatestVersion, getDependentsInfo, getSortedDependentsByStar };
