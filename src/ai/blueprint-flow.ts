// ─── Shared Catalog (from BlueprintPlayground) ────────────────────────────────
type PortKind = "exec" | "bool" | "float" | "string";
interface Port { id: string; label: string; kind: PortKind; }

const CATALOG: Record<string, { category: string; type: string; label: string; color: string; description: string; inputs: Port[]; outputs: Port[] }> = {
  START:        { category: "Events", type: "START",        label: "START",                 color: "#dc2626", description: "Entry point. Fires once at Begin Play.",                                                                                inputs: [],                                                      outputs: [{ id: "exec",    label: "Exec",           kind: "exec"  }] },
  EVENT_TICK:   { category: "Events", type: "EVENT_TICK",   label: "EVENT TICK",            color: "#f97316", description: "Fires every frame. Drives continuous polling.",                                                                         inputs: [],                                                      outputs: [{ id: "exec",    label: "Exec",           kind: "exec"  }] },
  BRANCH:       { category: "Flow Control", type: "BRANCH",       label: "BRANCH",                color: "#eab308", description: "If/Else gate. Routes True or False based on condition.",                                                               inputs: [{ id: "exec_in", label: "Exec", kind: "exec" }, { id: "condition", label: "Condition", kind: "bool" }], outputs: [{ id: "true",    label: "True",  kind: "exec" }, { id: "false",   label: "False", kind: "exec"  }] },
  SEQUENCE:     { category: "Flow Control", type: "SEQUENCE",     label: "SEQUENCE",              color: "#a855f7", description: "Fires multiple execution pins sequentially.",                                                                        inputs: [{ id: "exec_in", label: "Exec", kind: "exec" }],       outputs: [{ id: "then_0",  label: "Then 0", kind: "exec" }, { id: "then_1",  label: "Then 1", kind: "exec"  }] },
  DELAY:        { category: "Flow Control", type: "DELAY",        label: "DELAY",                 color: "#a855f7", description: "Pauses execution logic for a duration.",                                                                             inputs: [{ id: "exec_in", label: "Exec", kind: "exec" }, { id: "duration", label: "Duration", kind: "float" }], outputs: [{ id: "completed", label: "Completed", kind: "exec" }] },
  SET_VARIABLE: { category: "Variables", type: "SET_VARIABLE", label: "SET VARIABLE",          color: "#8b5cf6", description: "Sets a boss state variable to the given value.",                                                                       inputs: [{ id: "exec_in", label: "Exec", kind: "exec" }, { id: "value",     label: "Value",     kind: "float" }], outputs: [{ id: "exec",    label: "Exec",           kind: "exec"  }] },
  GET_HEALTH:   { category: "Variables", type: "GET_HEALTH",   label: "GET PLAYER HEALTH",     color: "#22c55e", description: "Returns player health (0–100) as a float.",                                                                            inputs: [],                                                      outputs: [{ id: "health",  label: "Health (float)", kind: "float" }] },
  INCREASE_DIFF:{ category: "Boss Actions", type: "INCREASE_DIFF",label: "INCREASE DIFFICULTY",   color: "#3b82f6", description: "Increases boss multiplier. Faster attacks, more damage.",                                                              inputs: [{ id: "exec_in", label: "Exec", kind: "exec"  }],       outputs: [{ id: "exec",    label: "Exec",           kind: "exec"  }] },
  DECREASE_DIFF:{ category: "Boss Actions", type: "DECREASE_DIFF",label: "DECREASE DIFFICULTY",   color: "#3b82f6", description: "Decreases boss multiplier. Easier tempo for struggling players.",                                                     inputs: [{ id: "exec_in", label: "Exec", kind: "exec"  }],       outputs: [{ id: "exec",    label: "Exec",           kind: "exec"  }] },
  PRINT_STRING: { category: "Boss Actions", type: "PRINT_STRING", label: "PRINT STRING",          color: "#14b8a6", description: "Logs a string to the debugging HUD.",                                                                                 inputs: [{ id: "exec_in", label: "Exec", kind: "exec" }, { id: "in_string", label: "String", kind: "string" }], outputs: [{ id: "exec", label: "Exec", kind: "exec" }] },
  COMPARE_FLOAT:{ category: "Math", type: "COMPARE_FLOAT",label: "COMPARE FLOAT",         color: "#22c55e", description: "Compares float A against float B.",                                                                                    inputs: [{ id: "a", label: "A", kind: "float" }, { id: "b", label: "B", kind: "float" }], outputs: [{ id: "exec", label: "Exec", kind: "exec" }, { id: "greater", label: ">", kind: "exec"}, { id: "equal", label: "==", kind: "exec"}, { id: "less", label: "<", kind: "exec"}] },
};

const CATALOG_KEYS = Object.keys(CATALOG);
const CATALOG_INSTRUCTIONS = CATALOG_KEYS.map(key => {
  const item = CATALOG[key];
  const ins = item.inputs.map(p => p.id).join(", ") || "none";
  const outs = item.outputs.map(p => p.id).join(", ") || "none";
  return `- ${key} (Inputs: ${ins} | Outputs: ${outs})`;
}).join("\n");

export async function blueprintFlow(prompt: string) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) throw new Error("Missing Google GenAI API Key");

  const systemInstruction = `You are an expert Unreal Engine Blueprint Architect. 
Create a fully functional visual logic graph for this boss mechanic prompt: "${prompt}".

RULES:
1. Choose the absolute best node sequence that fits the prompt logic. 
2. Spread out coordinate (X, Y) roughly 250px apart horizontally for flow. Ensure nodes do not overlap.
3. Ports MUST match the permitted inputs/outputs for the selected node exactly.
4. Output strict JSON only.

Available Nodes and Ports:
${CATALOG_INSTRUCTIONS}

Return a valid JSON object matching exactly this structure:
{
  "nodes": [{ "id": "n1", "type": "START", "x": 0, "y": 0 }, ...],
  "connections": [{ "id": "c1", "fromNode": "n1", "fromPort": "exec", "toNode": "n2", "toPort": "exec_in" }, ...],
  "message": "A 1-2 sentence description of the logic generated."
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        temperature: 0.8,
        responseMimeType: "application/json"
      }
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API Error: ${err}`);
  }

  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!textOutput) throw new Error("No textual output from Gemini.");

  const output = JSON.parse(textOutput);

  // Enrich the AI's simplified node map with full CATALOG metadata
  const enrichedNodes = output.nodes.map((n: any) => {
    const def = CATALOG[n.type];
    return {
      ...def,
      id: n.id,
      x: n.x,
      y: n.y,
    };
  });

  return {
    nodes: enrichedNodes,
    connections: output.connections,
    summary: output.message,
  };
}
