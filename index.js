let sheetData = [];

let sheet = document.getElementById("sheet");
let addColBtn = document.getElementById("add-column");
let addRowBtn = document.getElementById("add-row");
let removeRowBtn = document.getElementById("remove-row");
let sortRows = document.getElementById('sort-rows');
let selectedRow = 0;
let colLimit = 5;

let sideEffect = () => {
  let inputCol = document.getElementsByClassName("input-col");
  Array.from(inputCol).forEach((element) => {
    element.addEventListener("focus", (e) => {
      selectedRow = Number(e.target.parentNode.dataset.row);
    });
  });
};

let addSheetRow = () => {
  let newInputCol = document.createElement("input");
  newInputCol.setAttribute('id', new Date().getTime());
  sheetData = [...sheetData, [newInputCol]];
  selectedRow = sheetData.length - 1;
  render(sideEffect);
};

let addSheetCol = (e) => {
  let newInputCol = document.createElement("input");
  newInputCol.setAttribute('id', new Date().getTime());
  if (selectedRow > -1 && Array.isArray(sheetData[selectedRow])) {
    if (sheetData[selectedRow].length < colLimit) {
      sheetData[selectedRow].push(newInputCol);
    } else {
      selectedRow++;
      addSheetRow();
    }
  } else if (sheetData.length === 0) {
    addSheetRow();
  }
  render(sideEffect);
};

let removeSheetRow = () => {
  sheetData.splice(selectedRow,1);
  selectedRow = sheetData.length - 1;
  render(sideEffect);
};

let sortRowsWithMulCols = () => {
  sheetData.forEach((item) => {
    if(item && item.length > 1) {
      item.sort((a,b) => {
        let valueA = document.getElementById(a.id).value;
        let valeuB = document.getElementById(b.id).value;
        return valueA > valeuB ? 1 : -1;
      })
    }
  });
  render(sideEffect);
}

let getColumn = (data) => {
  const inputCollection = data.map((input) => {
    let val = document.getElementById(input.id)?document.getElementById(input.id).value : '0';
    return `
      <input type="text"
        class="input-col"
        id=${input.id}
        value=${val}
      />
    `;
  });
  return inputCollection.join("");
};

function render(callback) {
  sheet.innerHTML = sheetData
    .map((data, index) => {
      return `
        <div class="sheet-row" data-row=${index} id=${data.id}>
          ${getColumn(data)}
        </div>
      `;
    })
    .join("");
  callback();
}

render(sideEffect);
addRowBtn.addEventListener("click", addSheetRow);
addColBtn.addEventListener("click", addSheetCol);
removeRowBtn.addEventListener("click", removeSheetRow);
sortRows.addEventListener("click",sortRowsWithMulCols);
