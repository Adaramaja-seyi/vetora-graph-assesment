"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  Handle,
  Position,
  type Edge,
  type Node,
} from "@xyflow/react";

type KnowledgeGraphProps = {
  diseaseName: string;
};

type GraphNode = {
  id: string;
  label: string;
  type: string;
};

type GraphRelationship = {
  id: string;
  source: string;
  target: string;
  type: string;
};

// Custom Node Components with Handle connectors
function CustomDiseaseNode({ data }: { data: { label: string } }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-[#14201C] bg-[#1F4D3D] px-4 py-3 text-white shadow-xl shadow-[#1F4D3D]/25">
      <Handle type="target" position={Position.Left} className="!bg-[#14201C] !w-3 !h-3 !border-white" />
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#173B2E] text-white shadow-inner">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <div>
        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#EBF2EE]">
          Disease Node
        </span>
        <span className="font-extrabold text-sm tracking-tight">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-[#14201C] !w-3 !h-3 !border-white" />
    </div>
  );
}

function CustomSpeciesNode({ data }: { data: { label: string } }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-[#B98B4E] bg-[#F9F5EE] px-4 py-3 text-[#14201C] shadow-md shadow-[#B98B4E]/10">
      <Handle type="target" position={Position.Left} className="!bg-[#B98B4E] !w-3 !h-3 !border-white" />
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#B98B4E] text-white shadow-xs">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
        </svg>
      </div>
      <div>
        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#B98B4E]">
          Species Node
        </span>
        <span className="font-bold text-sm text-[#14201C]">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-[#B98B4E] !w-3 !h-3 !border-white" />
    </div>
  );
}

function CustomSymptomNode({ data }: { data: { label: string } }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border-2 border-[#E3DED3] bg-[#F6F4EF] px-3.5 py-2.5 text-[#14201C] shadow-md">
      <Handle type="target" position={Position.Left} className="!bg-[#485852] !w-3 !h-3 !border-white" />
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#485852] text-white shadow-xs">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <div>
        <span className="block text-[9px] font-extrabold uppercase tracking-wider text-[#485852]">
          Symptom Node
        </span>
        <span className="font-bold text-xs text-[#14201C]">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-[#485852] !w-3 !h-3 !border-white" />
    </div>
  );
}

export default function KnowledgeGraph({ diseaseName }: KnowledgeGraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const nodeTypes = useMemo(
    () => ({
      disease: CustomDiseaseNode,
      species: CustomSpeciesNode,
      symptom: CustomSymptomNode,
    }),
    []
  );

  useEffect(() => {
    async function fetchGraph() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/graph/disease/${encodeURIComponent(diseaseName)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load knowledge graph");
        }

        const graphNodes: GraphNode[] = data.nodes || [];
        const graphRelationships: GraphRelationship[] = data.relationships || [];

        // Node positioning logic with type-specific indexing
        let symptomIndex = 0;
        let speciesIndex = 0;
        
        const formattedNodes: Node[] = graphNodes.map((graphNode) => {
          let x = 400;
          let y = 250;

          if (graphNode.type === "Species") {
            x = 80;
            y = 150 + (speciesIndex * 120);
            speciesIndex++;
          }

          if (graphNode.type === "Disease") {
            x = 420;
            y = 220;
          }

          if (graphNode.type === "Symptom") {
            x = 760;
            y = 40 + (symptomIndex * 95);
            symptomIndex++;
          }

          const nodeTypeKey = graphNode.type ? graphNode.type.toLowerCase() : "disease";

          return {
            id: graphNode.id,
            type: nodeTypeKey,
            position: { x, y },
            data: { label: graphNode.label },
          };
        });

        const formattedEdges: Edge[] = graphRelationships.map(
          (relationship) => ({
            id: relationship.id,
            source: relationship.source,
            target: relationship.target,
            label: relationship.type ? relationship.type.replace("_", " ") : "",
            animated: true,
            style: { stroke: "#1F4D3D", strokeWidth: 2 },
            labelStyle: { fill: "#14201C", fontWeight: 700, fontSize: 11 },
            labelBgStyle: { fill: "#F6F4EF", fillOpacity: 0.95, rx: 6, ry: 6 },
          })
        );

        setNodes(formattedNodes);
        setEdges(formattedEdges);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load knowledge graph"
        );
      } finally {
        setLoading(false);
      }
    }

    if (diseaseName) {
      fetchGraph();
    }
  }, [diseaseName]);

  if (loading) {
    return (
      <div className="flex h-[520px] items-center justify-center rounded-3xl border border-[#E3DED3] bg-white shadow-xs">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#EBF2EE] border-t-[#1F4D3D]" />
          <p className="font-semibold text-[#14201C]">Fetching Knowledge Graph...</p>
          <p className="mt-1 text-xs text-[#485852]">Querying relationships from CognoDB</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[520px] items-center justify-center rounded-3xl border border-red-200 bg-red-50/80 p-6 text-center">
        <div className="max-w-md">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-bold text-[#14201C]">Unable to Load Graph</h3>
          <p className="mt-1 text-xs text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div className="flex h-[520px] items-center justify-center rounded-3xl border border-[#E3DED3] bg-white p-6 text-center">
        <p className="text-sm font-medium text-[#485852]">No graph relationships found for this disease node.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#E3DED3] bg-white shadow-xl shadow-[#14201C]/5 ring-1 ring-[#14201C]/5">
      {/* Graph Header */}
      <div className="border-b border-[#E3DED3] bg-[#F6F4EF] px-6 py-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#14201C] text-base">Knowledge Graph Engine</h3>
              {/* AI element in restrained indigo #4C5FD6 */}
              <span className="rounded-full bg-[#EEF0FD] px-2.5 py-0.5 text-[11px] font-bold text-[#4C5FD6] border border-[#4C5FD6]/20">
                Interactive Graph
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#485852]">
              Traversing live node relationships for <strong>{diseaseName}</strong>
            </p>
          </div>

          {/* Node Legend */}
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#14201C]">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-[#B98B4E] bg-[#F9F5EE]" />
              <span>Species</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-[#14201C] bg-[#1F4D3D]" />
              <span>Disease</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-[#485852] bg-[#F6F4EF]" />
              <span>Symptom</span>
            </div>
          </div>
        </div>
      </div>

      {/* React Flow Container */}
      <div className="h-[560px] w-full bg-[#F6F4EF]/40">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.35 }}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
        >
          <Background color="#E3DED3" gap={20} size={1} />
          <Controls />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </div>
    </div>
  );
}