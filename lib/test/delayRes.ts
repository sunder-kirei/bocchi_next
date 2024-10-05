export async function delayRes() {
  const promise = new Promise((res) => {
    setTimeout(() => {
      res({ data: [] });
    }, 5000);
  });

  return promise;
}
