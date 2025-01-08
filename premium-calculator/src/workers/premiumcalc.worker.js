onmessage = function (e) {
  const { sumInsured } = e.data;
  console.log('Received sumInsured in worker:', sumInsured);
  if (isNaN(sumInsured)) {
    console.log('Invalid sumInsured value');
    return;
  }
  const premium = (sumInsured * 0.05).toFixed(2);
  postMessage({premiumPerYear: premium, premiumPerMonth: (premium / 12).toFixed(2)});
};