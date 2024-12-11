

//1- Access to metamask
let account;
async function accessToMetamask() {

    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        console.log("User Account: " + account);
		await accessToContract();
    }
}

//2- connect to smart contract
async function accessToContract() {
    const ABI =[
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "adminAddresses",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "adminChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_email",
					"type": "string"
				}
			],
			"name": "adminEmailChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_password",
					"type": "string"
				}
			],
			"name": "adminPasswordChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_newAdminAddress",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_email",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_password",
					"type": "string"
				}
			],
			"name": "adminSignUp",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "candidateChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "candidateRequest",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "codeOfElection",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "codeOfRequest",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_electionName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_deadline",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_electionDate",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_electionDesc",
					"type": "string"
				}
			],
			"name": "createElection",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_age",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_description",
					"type": "string"
				}
			],
			"name": "editProfile",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "election",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "electionEndChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "electionStartChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "electionWaitChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "endElection",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "getAllCandidate",
			"outputs": [
				{
					"internalType": "address[]",
					"name": "candidateAddress",
					"type": "address[]"
				},
				{
					"internalType": "string[]",
					"name": "candidateName",
					"type": "string[]"
				},
				{
					"internalType": "uint256[]",
					"name": "candidateAge",
					"type": "uint256[]"
				},
				{
					"internalType": "string[]",
					"name": "candidateDesc",
					"type": "string[]"
				},
				{
					"internalType": "uint256[]",
					"name": "candidateVote",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getAllElection",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "ids",
					"type": "uint256[]"
				},
				{
					"internalType": "string[]",
					"name": "names",
					"type": "string[]"
				},
				{
					"internalType": "string[]",
					"name": "deadline",
					"type": "string[]"
				},
				{
					"internalType": "string[]",
					"name": "date",
					"type": "string[]"
				},
				{
					"internalType": "string[]",
					"name": "desc",
					"type": "string[]"
				},
				{
					"internalType": "string[]",
					"name": "status",
					"type": "string[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getAllRequest",
			"outputs": [
				{
					"internalType": "uint256[]",
					"name": "requestID",
					"type": "uint256[]"
				},
				{
					"internalType": "address[]",
					"name": "addresses",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "electionID",
					"type": "uint256[]"
				},
				{
					"internalType": "string[]",
					"name": "role",
					"type": "string[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getAllUser",
			"outputs": [
				{
					"internalType": "address[]",
					"name": "usersAddress",
					"type": "address[]"
				},
				{
					"internalType": "string[]",
					"name": "userNames",
					"type": "string[]"
				},
				{
					"internalType": "string[]",
					"name": "userEmails",
					"type": "string[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_electionName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_deadline",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_electionDate",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_electionDesc",
					"type": "string"
				}
			],
			"name": "modifyElection",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestID",
					"type": "uint256"
				}
			],
			"name": "removeRequest",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "request",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_newPassword",
					"type": "string"
				}
			],
			"name": "resetAdminPassword",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_newPassword",
					"type": "string"
				}
			],
			"name": "resetUserPassword",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "startElection",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "userAddresses",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "userChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_email",
					"type": "string"
				}
			],
			"name": "userEmailChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_password",
					"type": "string"
				}
			],
			"name": "userPasswordChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_newUserAddress",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_email",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_password",
					"type": "string"
				}
			],
			"name": "userSignUp",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_newCandidateAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_requestID",
					"type": "uint256"
				}
			],
			"name": "validateCandidate",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_newVoterAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_requestID",
					"type": "uint256"
				}
			],
			"name": "validateVoter",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_candidateAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "voteCandidate",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "voterChecker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isTrue",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_electionID",
					"type": "uint256"
				}
			],
			"name": "voterRequest",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isSuccess",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
    const Address = "0x83A2835BffBF90909F1c27713000a5AA21Ffe7d9";
    window.web3 = await new Web3(window.ethereum); //how to access to smart contract 
    window.contract = await new window.web3.eth.Contract(ABI, Address); //how you create an instance of that contract by using the abi and address  
}