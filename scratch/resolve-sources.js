const r = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFPw5x1jDA97XqC77EFGhyQArGt3BmxzrlMXM4mAszwVqFSKM7sLs3wwEL_UMzZ67GBwzmrJrVtzDRYguHMw_r7EGmx8EoHHj9IH6jA0-HJvRjfBDVuaKctrU74wq-xToqjQtpWfCQ1-sn29bgZAwubzRHkN2x78l_ESncEEQQXpLmx3R8khxyd';

fetch(r, { redirect: 'manual' })
  .then(res => console.log('Location:', res.headers.get('location')))
  .catch(e => console.error(e));
