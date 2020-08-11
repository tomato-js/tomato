/**
 * @packageDocumentation
 * @module @tomato-js/api
 */
import { get } from "@tomato-js/request";
import { PQueue } from "@tomato-js/async";
import { Github, GithubOptions } from "./github";
import * as cheerio from "cheerio";
type GetNpmDependentsOptions = { concurrency?: number };
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
export type NpmOptions = {
  name?: string;
  pages?: number;
};
/**
 * 获取npm包信息
 *
 * 新增于v0.0.21
 *
 * 脚本举例
 * ```
 *   import { Npm } from '@tomato-js/api'
 *   const api = new Npm({
 *     name:'http-server',
 *     pages: 3
 *   })
 *   (async()=>{
 *     const info = await getSortedDependentsByStar({
 *       token:'Your github token'
 *     });
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
 *   })()
 *
 * ```
 *
 * @param settings - 配置
 * @param settings.name - 包名称
 * @param settings.pages - 请求页数
 * @returns 依赖该包的npm包详细信息
 */
class Npm {
  private packageName: string;
  private pages: number;
  constructor(options?: NpmOptions) {
    const { name = "", pages = 10 } = options || {};
    this.packageName = name;
    this.pages = pages;
  }
  // 排序
  private _sortInfos(options: SortInfosOptions) {
    const { infos, sortBy = "stars" } = options;
    return Object.values(infos).sort((a: any, b: any) => {
      return (Object.values(b)[0] as any)[sortBy] - (Object.values(a)[0] as any)[sortBy];
    });
  }
  /**
   * 获取npm包被依赖列表
   *
   * 新增于v0.0.21
   *
   * 脚本举例
   * ```
   *   import { Npm } from '@tomato-js/api'
   *   const api = new Npm({
   *     name:'http-server',
   *     pages: 3
   *   })
   *   (async()=>{
   *     const data = await api.getNpmDependents();
   *   })()
   *   //['pack','pack2']
   * ```
   *
   * @param settings - 配置
   * @param settings.concurrency - 请求队列的并发数，默认为40
   * @returns 依赖该包的队列
   */
  public async getNpmDependents({ concurrency = 40 }: GetNpmDependentsOptions) {
    const dependents: string[] = [];
    const visited = new Set();
    let page = 0;
    const queue = new PQueue({
      autoStart: true,
      concurrency
    });
    const next = async (page: number) => {
      const offset = page * 36;
      const url = `https://npmjs.com/browse/depended/${this.packageName}?offset=${offset}`;
      const { data } = await get(url);
      const $ = cheerio.load(data);
      $('a[href^="/package/"]').each((_, el) => {
        const dependant = ($(el) as any).attr("href").slice("/package/".length);
        if (dependant !== this.packageName && !visited.has(dependant)) {
          dependents.push(dependant);
          visited.add(dependant);
        }
      });
    };
    while (page < this.pages) {
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
   *   import { Npm } from '@tomato-js/api'
   *   const api = new Npm({
   *     name:'http-server',
   *     pages: 3
   *   })
   *   (async()=>{
   *     const data = await api.getNpmRegistryInfo();
   *   })()
   * ```
   *
   * @param packageName - 包名称
   * @returns 包完整信息
   */
  public async getNpmRegistryInfo(packageName: string) {
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
   *   import { Npm } from '@tomato-js/api'
   *   const api = new Npm({
   *     name:'http-server',
   *     pages: 3
   *   })
   *   (async()=>{
   *     const version = await api.getNpmRegistryInfo('http-server');
   *   })()
   *   //1.2.3
   * ```
   *
   * @param packageName - 包名称
   * @returns 包最新版本号
   */
  public async getNpmLatestVersion(packageName: string) {
    const info = await this.getNpmRegistryInfo(packageName);
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
   *   import { Npm } from '@tomato-js/api'
   *   const api = new Npm({
   *     name:'http-server',
   *     pages: 3
   *   })
   *   (async()=>{
   *     const info = await getDependentsInfo({
   *       token:'Your github token'
   *     });
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
   *   })()
   *
   * ```
   *
   * @param settings - 配置
   * @param settings.token - github 的token
   * @param settings.concurrency - 请求队列的并发数，默认为40
   * @returns 依赖该包的npm包详细信息
   */
  public async getDependentsInfo({ concurrency = 40, token }: GetDependentsInfoOptions) {
    const urlRegex = /github.com\/([^/])+\/[^/]+/g;
    const githubAPI = new Github({
      token
    });
    const depArr = await this.getNpmDependents({
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
      const resp = await this.getNpmRegistryInfo(depArr[index]);
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
   * 获取npm包依赖包按github的star排序
   *
   * 新增于v0.0.21
   *
   * 脚本举例
   * ```
   *   import { Npm } from '@tomato-js/api'
   *   const api = new Npm({
   *     name:'http-server',
   *     pages: 3
   *   })
   *   (async()=>{
   *     const info = await getSortedDependentsByStar({
   *       token:'Your github token'
   *     });
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
   *   })()
   *
   * ```
   *
   * @param settings - 配置
   * @param settings.token - github 的token
   * @param settings.concurrency - 请求队列的并发数，默认为40
   * @returns 依赖该包的npm包详细信息
   */
  public async getSortedDependentsByStar({ concurrency = 40, token }: GetDependentsInfoOptions) {
    const deps = await this.getDependentsInfo({ concurrency, token });
    const sorted = this._sortInfos({ infos: deps });
    return sorted;
  }
}
export { Npm };
