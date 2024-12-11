

async function loadElection() {
    const elections = await window.contract.methods.getAllElection().call();

    display(elections);
    console.log(elections);
}


function display(elections) {
      const  election_ID = elections['ids'];
      const  election_name = elections['names'];
      const  election_status = elections['status'];

    elm = `
    <tr>
                <td>Election ID</td>
                <td>Election Name</td>
                <td>Status</td>
                <td>Modify Election</td>
                <td>Election Detail</td>
            </tr>`;

    for (let i = election_ID.length - 1; i >= 0; i--) {

        elm += `
            <tr>
                <td>${election_ID[i]}</td>
                <td>${election_name[i]}</td>
                <td>${election_status[i]}</td>
                <td>
                <a href="modify_election.html?_name=${election_name[i]}" class="modify-btn" >Modify</a>
                </td>
                <td>
                <a href="view_election.html?_name=${election_name[i]}" class="view-btn" >View</a>
                </td>

            </tr>
        `;
    }
    document.getElementById('block').querySelector('table').innerHTML = elm; 
}
