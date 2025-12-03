const steps = ['填写链接', '选择工作表', '选择字段', '填写起始列', '起个名字'] as const;

const stepIndex = steps.indexOf('填写链接'); ;

console.log(`当前步骤索引是：${stepIndex}`);