fetch(API_BASE_URL)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("experienceList");

    data.forEach(item => {
      const li = document.createElement("li");

      const start = formatDate(item.startdate);
      const end = formatDate(item.enddate);

      li.innerHTML = `${item.companyname} – ${item.jobtitle} (${start} till ${end})<br>${item.description} <br><button class="delete-button" data-id="${item.id}">Ta bort</button>`;
      list.appendChild(li);
    });

    document.querySelectorAll(".delete-button").forEach(button => {
      button.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;

        if (confirm("Vill du verkligen ta bort den här erfarenheten?")) {
          try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
              method: "DELETE"
            });

            if (res.ok) {
              e.target.parentElement.remove(); 
            } else {
              const errData = await res.json();
              alert("Fel vid borttagning: " + errData.error);
            }
          } catch (err) {
            console.error("Något gick fel vid borttagning:", err);
          }
        }
      });
    });
  })
  .catch(err => console.error("Fel vid hämtning:", err));

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; 
}