fetch(API_BASE_URL)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("experienceList");
    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.companyname} – ${item.jobtitle} (${item.startdate} till ${item.enddate})`;
      list.appendChild(li);
    });
  })
  .catch(err => console.error("Fel vid hämtning:", err));