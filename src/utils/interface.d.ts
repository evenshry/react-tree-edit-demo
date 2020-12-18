declare namespace Util {
  /**
   * 节点信息
   */
  interface NodeInfo {
    title: string;
    key: string;
    path?: string;
    children?: Array<NodeInfo>;
  }
}
