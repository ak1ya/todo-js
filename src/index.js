import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromOncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");
  li.className = "li-parent";

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // p生成
  const p = document.createElement("p");
  p.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された削除ボタンの祖先タグ(li)を未完了リストから削除
    deleteFromOncompleteList(completeButton.closest(".li-parent"));

    // 完了リストに追加する要素
    const addTarget = completeButton.closest(".li-parent");

    // TODO内容テキストの取得
    const text = addTarget.querySelector("p").innerText;

    // li以下を初期化
    addTarget.textContent = null;

    // divタグの生成
    const div = document.createElement("div");
    div.className = "list-row";

    // p生成
    const p = document.createElement("p");
    p.innerText = text;

    // button(戻す)タグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの祖先タグ(li)を完了リストから削除
      const deleteTarget = backButton.closest(".li-parent");
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = deleteTarget.querySelector("p").innerText;

      // 未完了リストへ
      createIncompleteList(text);
    });

    // liタグの下に子要素を設定
    li.appendChild(div);

    // divタグの下に子要素を設定
    div.appendChild(p);
    div.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの祖先タグ(li)を未完了リストから削除
    deleteFromOncompleteList(deleteButton.closest(".li-parent"));
  });

  // liタグの下に子要素を設定
  li.appendChild(div);

  // divタグの下に子要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
