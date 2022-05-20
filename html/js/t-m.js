function convert(list) {
  return list.map((item) => {
    const { goodsPartsDescribe, id, goodsPartSubCode } = item;
    return {
      showMark: "胸前正标",
      sign: "大标23.5cm",
      id,
      name: goodsPartsDescribe,
      image: `/style_material/polo/${goodsPartSubCode}.png`,
    };
  });
}
