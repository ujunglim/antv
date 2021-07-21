import styled from "styled-components";

// setting of initial nodes(开始，结束，+)
const nodeSetting = {
  shape: "circle",
  width: 50,
  height: 50,
  attrs: {
    body: {
      stroke: "lightgrey",
      strokeWidth: 1
    }
  }
};

export default function GraphInitialize(graph) {
  // const bounds = useRef([]);

  const source = graph.addNode({
    ...nodeSetting,
    x: 80,
    y: 30,
    attrs: {
      label: {
        text: "开始"
      }
    }
  });

  const target = graph.addNode({
    ...nodeSetting,
    x: 80,
    y: 140,
    attrs: {
      label: {
        text: "结束"
      }
    }
  });

  const plusNode = graph.addNode({
    ...nodeSetting,
    id: "plus",
    x: 98,
    y: 80,
    width: 13,
    height: 13,
    attrs: {
      label: {
        text: "+"
      }
    }
  });

  const empty = {
    shape: "react-shape", //*  !!!!  *//
    component: <Empty>请将左侧服务或关系拖入框内</Empty>,
    x: 5,
    y: 140,
    width: 200,
    height: 50,
    id: "empty"
  };

  const edgeAttrs = {
    attrs: {
      line: {
        stroke: "#1890FF",
        sourceMarker: "circle"
        // size: 1
      }
    }
  };

  graph.addEdge({
    ...edgeAttrs,
    source: plusNode,
    target
  });

  graph.on("node:click", ({ node }) => {
    if (node.id === "plus") {
      // add emptyNode
      const emptyNode = graph.addNode(empty);
      target.translate(undefined, 100);
      // plus is invisible
      plusNode.hide();
      // add 上面edge
      graph.addEdge({
        ...edgeAttrs,
        source,
        target: emptyNode
      });
      // add 下面edge
      graph.addEdge({
        ...edgeAttrs,
        source: emptyNode,
        target
      });
    }
  });

  graph.on("node:mouseenter", ({ node }) => {
    if (node.id === "empty") {
      node.addTools([
        {
          name: "button-remove",
          args: {
            x: "100%",
            y: 0,
            offset: { x: 20, y: 25 }
          }
        }
      ]);
    }
  });

  graph.on("node:mouseleave", ({ node }) => {
    if (node.id === "empty") {
      node.removeTools();
    }
  });
}

//========= Styled Component ==========
const Empty = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  border: 2px dashed lightgrey;
  font-size: small;
  color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
`;
