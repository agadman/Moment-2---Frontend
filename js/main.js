fetch(API_BASE_URL)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("experienceList");

    data.forEach(item => {
      const li = document.createElement("li");

      const start = formatDate(item.startdate);
      const end = formatDate(item.enddate);

      li.innerHTML = `${item.companyname} – ${item.jobtitle} (${start} till ${end})<br>${item.description}`;
      list.appendChild(li);
    });
  })
  .catch(err => console.error("Fel vid hämtning:", err));

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; 
}