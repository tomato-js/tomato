/**
 * @packageDocumentation
 * @module @tomato-js/api
 */
import { isNode } from "@tomato-js/env";
import { isNil, ObjectType, isEmpty } from "@tomato-js/shared";
import { Groups, GroupProjects, Repositories, RepositoryFiles, Projects } from "@gitbeaker/core";
export type GitlabOptions = {
  token?: string;
  baseUrl?: string;
};
export type CoreOptions = GitlabOptions;
export type Sample = {
  id: number | string;
};
export type Download = {
  path: string;
  ref?: string;
} & Sample;
export type CloneOptions = {
  link: string;
  path?: string;
};
export type CloneProjectOptions = {
  path?: string;
} & Sample;
export type CoreInstance = {
  Groups: Groups;
  GroupProjects: GroupProjects;
  Repositories: Repositories;
  RepositoryFiles: RepositoryFiles;
  Projects: Projects;
};
class Gitlab {
  private token: string | undefined;
  private baseUrl: string;
  private isNode: boolean;
  public core!: CoreInstance;
  /**
   * 子进程执行git clone
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *      await myGitlab.clone({ link: 'ssh://git@gitlab.com/test/test.git'});
   *    })();
   * ```
   * @param options - 信息
   * @param options.link - ssh链接
   * @param options.path - 文件路径
   */
  public clone!: (data: CloneOptions) => Promise<void>;
  /**
   * 根据project id克隆项目
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *      await myGitlab.cloneProject({ id: 12345, path: './myDemo'});
   *    })();
   * ```
   * @param options - 信息
   * @param options.id - project id
   * @param options.path - clone到哪个文件路径
   */
  public cloneProject!: (data: Sample) => Promise<void>;
  /**
   * 根据group id克隆一个组所有项目
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *      await myGitlab.cloneGroup({ id: 12345'});
   *    })();
   * ```
   * @param options - 信息
   * @param options.id - group id
   */
  public cloneGroup!: (data: Sample) => Promise<void>;
  constructor(options: GitlabOptions) {
    const { token, baseUrl } = options;
    this.token = token;
    this.baseUrl = baseUrl ?? "https://gitlab.com/";
    this.isNode = isNode();
  }
  private async initCore(options: CoreOptions) {
    let gitlab;
    if (this.isNode) {
      gitlab = (await import("@gitbeaker/node")).Gitlab;
    } else {
      gitlab = (await import("@gitbeaker/browser")).Gitlab;
    }
    this.core = new gitlab({
      host: options.baseUrl,
      token: options.token
    });
  }
  /**
   * 创建gitlab对象
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *    })();
   * ```
   * @param options - 信息
   * @param options.baseUrl - gitlab的url
   * @param options.token - 账号的token
   * @returns gitlab对象
   */
  public static async create(options: GitlabOptions) {
    const instance = new Gitlab(options);
    await instance.initCore(options);
    return instance;
  }
  /**
   * 获取子组信息
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *      const info = await myGitlab.fetchSubGroups({ id: 12343 });
   *      console.log(info);
   *    })();
   * ```
   * @param options - 信息
   * @param options.id - 要查询的组的id
   * @returns 组内所有子组的信息
   */
  public async fetchSubGroups(options: Sample) {
    const { id } = options;
    const result = await this.core.Groups.all({ id });
    return result;
  }
  /**
   * 获取指定组下所有工程信息
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *      const info = await myGitlab.fetchGroupProjects({ id: 12343 });
   *      console.log(info);
   *    })();
   * ```
   * @param options - 信息
   * @param options.id - 要查询的组的id
   * @returns 组内所有工程信息
   */
  public async fetchGroupProjects(options: Sample) {
    const { id } = options;
    const result = await this.core.GroupProjects.all(id);
    return result;
  }
  /**
   * 获取指定工程下所有文件及目录信息
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *      const info = await myGitlab.fetchProjectRepositories({ id: 12343 });
   *      console.log(info);
   *    })();
   * ```
   * @param options - 信息
   * @param options.id - 要查询的工程的id
   * @returns 工程内所有资源信息
   */
  public async fetchProjectRepositories(options: Sample) {
    const { id } = options;
    const result = await this.core.Repositories.tree(id);
    return result;
  }
  /**
   * 获取指定工程下某个文件内容
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *      const info = await myGitlab.fetchFileContent({ id: 12343,path:'package.json',ref:'master'});
   *      console.log(info);
   *    })();
   * ```
   * @param options - 信息
   * @param options.id - 要查询的工程的id
   * @param options.path - 文件路径
   * @param options.id - 分支
   * @returns 文件内容
   */
  public async fetchFileContent(options: Download) {
    const { id, path, ref = "master" } = options;
    const result = await this.core.RepositoryFiles.showRaw(id, path, ref);
    return result;
  }
  /**
   * 获取指定工程的详情信息
   *
   * 新增于v0.0.23
   *
   * 脚本举例
   * ```
   *   import { Gitlab } from '@tomato-js/api';
   *   (async () => {
   *      const myGitlab = await Gitlab.create({
   *        baseUrl: "https://*******",
   *        token: "******"
   *      });
   *      const info = await myGitlab.fetchProject({ id: 12343});
   *      console.log(info);
   *    })();
   * ```
   * @param options - 信息
   * @param options.id - 要查询的工程的id
   * @returns 工程相关信息
   */
  public async fetchProject(options: Sample): Promise<ObjectType<any>> {
    const { id } = options;
    const result = await this.core.Projects.show(id);
    return result;
  }
}
if (isNode()) {
  let cp: any;
  Gitlab.prototype.clone = async function(options: CloneOptions) {
    const { link, path } = options;
    if (isNil(cp)) {
      cp = (await import("@tomato-node/process")).cp;
    }
    await cp("git", ["clone", `${link}`, ...(isNil(path) ? [] : [path])]);
  };
  Gitlab.prototype.cloneProject = async function(options: CloneProjectOptions) {
    const { id, path } = options;
    const info = await this.fetchProject({ id });
    const { ssh_url_to_repo: link } = info;
    await this.clone({ link, path });
  };
  Gitlab.prototype.cloneGroup = async function(options: Sample) {
    const { id } = options;
    const projects = await this.fetchGroupProjects({ id });
    if (isEmpty(projects)) {
      return;
    }
    while (projects.length) {
      const project: any = projects.shift();
      const { ssh_url_to_repo: link } = project;
      await this.clone({ link });
    }
  };
}

export { Gitlab };
