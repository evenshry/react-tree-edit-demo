import React, { useEffect, useState } from 'react';
import { Modal, Tree, Input, Button } from 'antd';
import { defaultTreeData, setNodeTitleByPath } from '../utils';
import './style.css';

function App() {
  // 数节点数据
  const [sourceTreeData, setSourceTreeData] = useState<Array<Util.NodeInfo>>([]);
  // 弹窗显示状态
  const [showModal, setShowModal] = useState<boolean>(false);
  // 输入框的值
  const [inputValue, setInputValue] = useState<string>('');
  // 当前节点数据
  const [selectNode, setSelectNode] = useState<Util.NodeInfo>();

  useEffect(() => {
    setSourceTreeData(defaultTreeData);
  }, []);

  /**
   * 选择节点，保存当前节点，打开弹窗
   */
  const handleSelect = (node: Util.NodeInfo) => {
    setSelectNode(node);
    setInputValue(node.title);
    setShowModal(true);
  };

  /**
   * 关闭弹窗，保存文本框的值到节点上
   */
  const handleOk = () => {
    setShowModal(false);
    if (selectNode && selectNode.path) {
      // 跟进路径修改相应的节点
      const newTreeData = setNodeTitleByPath(sourceTreeData, selectNode.path.split('/'), inputValue);
      setSourceTreeData(newTreeData);
    }
  };

  /**
   * 更新文本框
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * 获取节点
   */
  const getTitleNode = (node: Util.NodeInfo) => (
    <>
      <span className="text">{node.title}</span>
      <Button
        className="btn"
        size="small"
        type="primary"
        onClick={() => {
          handleSelect(node);
        }}
      >
        编辑
      </Button>
    </>
  );

  /**
   * 获取节点
   */
  const getTreeNode = (node: Util.NodeInfo) => (
    <Tree.TreeNode title={getTitleNode(node)} key={node.path}>
      {node.children && node.children.length > 0 ? node.children.map((item) => getTreeNode(item)) : null}
    </Tree.TreeNode>
  );

  return (
    <>
      <div className="container">
        <div className="leftContainer">
          <Tree selectable={false}>{sourceTreeData.map((item) => getTreeNode(item))}</Tree>
        </div>
        <div className="rightContainer"></div>
      </div>

      <Modal title="修改名称" visible={showModal} onOk={handleOk} onCancel={() => setShowModal(false)}>
        <p>
          <Input value={inputValue} onChange={handleChange} />
        </p>
      </Modal>
    </>
  );
}

export default App;
