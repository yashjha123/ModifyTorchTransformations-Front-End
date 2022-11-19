import suggestion from "./suggestions.json"
const completions = suggestion.completions
// const completions = [
//   {
//     l: "transforms.CenterCrop",
//     s: "transforms.CenterCrop(${1:size}),",
//     doc: "Crops the given image at the center.",
//   },
//   {
//     l: "transforms.ColorJitter",
//     s: "transforms.ColorJitter([${1:brightness}, ${2:contrast}, ${...}]),",
//     doc: "Randomly change the brightness, contrast, saturation and hue of an image.",
//   },
//   {
//     l: "transforms.FiveCrop",
//     s: "FiveCrop(${1:size}),",
//     doc: "Crop the given image into four corners and the central crop.",
//   },
//   {
//     l: "transforms.Grayscale",
//     s: "FiveCrop(${1:size}),",
//     doc: "Crop the given image into four corners and the central crop.",
//   },
//   // {l: "transforms.FiveCrop", s:"FiveCrop(${1:size}),",doc:"Crop the given image into four corners and the central crop."},
// ];

const suggestions = (range, monaco) => {
  const ret = [
    {
      label: "transforms.Compose([])",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "The Lodash library exported as Node.js modules.",
      insertText: "transforms.Compose([\n\t$0\n])",
      range: range,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    }
  ];
  completions.map((val)=>{
    
    ret.push({
      label: val.l,
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: val.doc,
      insertText: val.s,
      range: range,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    })
  })
  console.log(ret)
  return ret;
};
export default suggestions;
