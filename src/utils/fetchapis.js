export const convertPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/convertpdf", {
    method: "POST",
    body: formData,
  });
  return res.text();
};

export const getJob = async (text) => {
  const res = await fetch("/api/getJob", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.json();
};

export const getQuestionArr = async (text, resultJob) => {
  const res = await fetch("/api/resquestionarr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, resultJob }),
  });
  return res.json();
};
