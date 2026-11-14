const tabsData = [
  {
    id: "tabs1",
    title: "Tab 1",
    content: "This is the content of Tab 1",
  },
  {
    id: "tabs2",
    title: "Tab 2",
    content: "This is the content of Tab 2",
  },
  {
    id: "tabs3",
    title: "Tab 3",
    content: "This is the content of Tab 3",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  let activeTab = tabsData[0].id;

  function renderTabs() {
    const tabsContainer = document.getElementById("tabContainer");
    const tabContentContainer = document.getElementById("tabContentContainer");

    tabsData.forEach((tab) => {
      const tabButton = document.createElement("button");
      tabButton.innerText = tab.title;
      tabButton.className = "tabLinks";
      tabButton.setAttribute("data-tab", tab.id);

      tabsContainer.appendChild(tabButton);

      const tabContent = document.createElement("div");
      tabContent.id = tab.id;
      tabContent.className = "tabContent";
      tabContent.innerHTML = `<h3>${tab.title}</h3><p>${tab.content}</p>`;

      tabContentContainer.appendChild(tabContent);
    });

    tabsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("tabLinks")) {
        activeTab = event.target.getAttribute("data-tab");
        updateActiveTab();
      }
    });

    updateActiveTab();
  }

  function updateActiveTab() {
    document.querySelectorAll(".tabLinks").forEach((tabButton) => {
      tabButton.classList.toggle(
        "active",
        tabButton.getAttribute("data-tab") === activeTab,
      );
    });

    document.querySelectorAll(".tabContent").forEach((content) => {
      content.classList.toggle("active", content.id === activeTab);
    });
  }
  renderTabs();
});
