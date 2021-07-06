/* 
  Low-level UUID Generator
  Eg. 2g2d4-1c3a
  
  Github: github.com/movwf
*/
const uuid = () => {
  let uid = "";
  for (let i = 0; i < 10; i++) {
    if (i == 5) {
      uid += "-";
      continue;
    } else if (i % 2 == 0) {
      uid += Math.floor(Math.random() * 10);
    } else {
      uid += ["a", "b", "c", "d", "e", "f", "g", "h"][
        Math.floor(Math.random() * 7)
      ];
    }
  }
  return uid;
};

export default uuid;
