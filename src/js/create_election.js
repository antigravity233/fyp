async function createElection() {
    _name = document.getElementById('election_name').value;
    _dead = document.getElementById('election_dead').value;
    _date = document.getElementById('election_date').value;
    _desc = document.getElementById('election_desc').value;

    if ((_name === "") && (_dead === "")&& (_date === "")&& (_desc === "")) {
            alert('Please fill all field ！！');
        }
        else if(_dead > _date){
            alert('Election date must after the the register deadline created successfully.');
        }
        else{
            await window.contract.methods.createElection(_name, _dead, _date, _desc).send({ from: account });
            console.log('Election '+ _name+ ' created successfully.');
            document.location.href = 'admin_election.html';
            alert('Election '+ _name+ ' created successfully.');
        }

}