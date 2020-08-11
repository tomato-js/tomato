import { getIns, RequestInstance } from "@tomato-js/request";

export type GithubOptions = {
  token: string;
};
/**
 * 获取指定github仓库完整信息
 *
 * 新增于v0.0.21
 *
 * 脚本举例
 * ```
 *   import { Github } from '@tomato-js/api'
 *   const api = new Github({
 *     token:'your_token', // github的token
 *   });
 *   (async()=>{
 *     const data = await api.getRepoData('brizer','mrgx');
 *   })()
 *   //{
 *   //  stargazers_count:20,
 *   //  ...
 *   //}
 * ```
 */
class Github {
  private request: RequestInstance;
  constructor(options: GithubOptions) {
    const { token } = options;
    let headers: any = {};
    token && (headers.Authorization = `token ${token}`);
    this.request = getIns({
      headers,
      baseURL: "https://api.github.com/",
      timeout: 10000
    });
  }
  public async getRepoData(owner: string, repo: string) {
    try {
      const { data } = await this.request.get(`repos/${owner}/${repo}`);
      return {
        stargazers: data.stargazers_count
      };
    } catch (error) {
      if (error.response && error.response.status == 404) {
        throw Error(`Could not find GitHub repository at https://www.github.com/${owner}/${repo}`);
      } else {
        throw error;
      }
    }
  }
}
export { Github };
