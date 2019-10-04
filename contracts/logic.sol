pragma solidity ^0.5.11;

contract finance {
    
    uint Id;
    uint lendersId;
  
   struct lender{
    address payable lenderAddress;
    string name;
    uint userId;
    bool created;
    string addr;
    string contactNumber;
    uint poolCapacity;
  
    }

struct request{
    address payable requesterAddress;
    string name;
    string mobile;
    string permanentAddress;
    uint loanId;
    address payable lender;
    uint loanAmount;
    uint repaymentPeriod;
    uint settledAmount;
      }
    struct userLoan{
    uint loanId;
    address lender;
    uint loanAmount;
    uint repaymentPeriod;
      }
    struct loanRequest{
    uint loanId;
    address requester;
    uint loanAmount;
    string contactAddress;
      }
    struct requestStatus{
    uint loanId;
    bool isApproved;
    bool isExists;
    bool isEnded;
    uint dateApproved;
  
   }
mapping(address=>loanRequest[])private lenderRequests;
mapping(address=>userLoan[])private userLoans;
mapping(address=>lender) public lenders;
mapping(address=>mapping(uint=>request)) private loanRequests;
mapping(address=>mapping(uint=>requestStatus))private loanRequestsStatus;
lender[] public allLenders;

function registerlender(string memory _name, string memory _address,string memory _contactNumber,uint _poolCapacity) public {
        require(!lenders[msg.sender].created,"Account is Already Created");
    
        lender memory Lender=lender(msg.sender,_name,lendersId++,true,_address,_contactNumber,_poolCapacity);
        allLenders.push(Lender);
        
        lenders[msg.sender].lenderAddress = msg.sender;
        lenders[msg.sender].name = _name;
        lenders[msg.sender].userId=lendersId;
        lenders[msg.sender].created = true;
        lenders[msg.sender].addr = _address;
        lenders[msg.sender].contactNumber =_contactNumber;
        lenders[msg.sender].poolCapacity =_poolCapacity;
       }

function requestLoan(string memory _name, string memory _contactNumber, string memory _address, address _lender, uint _amount, uint _repaymentPeriod) public {
            require(lenders[_lender].created,"Lender is not Existed");
          
            uint _loanId=Id++;
            loanRequest memory request=loanRequest(_loanId,msg.sender,_amount,_address);
            userLoan memory loan =userLoan(_loanId,_lender,_amount,_repaymentPeriod);
            userLoans[msg.sender].push(loan);
            lenderRequests[_lender].push(request);
            loanRequests[_lender][_loanId].requesterAddress=msg.sender;
            loanRequests[_lender][_loanId].name=_name;
            loanRequests[_lender][_loanId].mobile=_contactNumber;
            loanRequests[_lender][_loanId]. permanentAddress=_address;
            loanRequests[_lender][_loanId].loanId=_loanId;
            loanRequestsStatus[_lender][_loanId].loanId=_loanId;
            loanRequestsStatus[_lender][_loanId].isExists=true;
            loanRequests[_lender][_loanId].lender=lenders[_lender].lenderAddress;
            loanRequests[_lender][_loanId].loanAmount=_amount;
            loanRequests[_lender][_loanId].repaymentPeriod=_repaymentPeriod;
            
  
            loanRequests[msg.sender][_loanId].requesterAddress=msg.sender;
            loanRequests[msg.sender][_loanId].name=_name;
            loanRequests[msg.sender][_loanId].mobile=_contactNumber;
            loanRequests[msg.sender][_loanId]. permanentAddress=_address;
            loanRequests[msg.sender][_loanId].loanId=_loanId;
            loanRequestsStatus[msg.sender][_loanId].isExists=true;
            loanRequests[msg.sender][_loanId].lender=lenders[_lender].lenderAddress;
            loanRequests[msg.sender][_loanId].loanAmount=_amount;
            loanRequests[msg.sender][_loanId].repaymentPeriod=_repaymentPeriod;
   

           }

function approveLoan(uint _loanId) public payable {
            require(loanRequestsStatus[msg.sender][_loanId].isExists,"Loan with this Id is not Existed");
            require(!loanRequestsStatus[msg.sender][_loanId].isApproved,"Loan with this Id is not Approved Yet");
            require(msg.value==loanRequests[msg.sender][_loanId].loanAmount,"Amount is less than LoanAmount");
           
            
          loanRequests[msg.sender][_loanId].requesterAddress.transfer(msg.value);
          loanRequestsStatus[msg.sender][_loanId].isApproved= true;
          loanRequestsStatus[msg.sender][_loanId].dateApproved=now;


          loanRequestsStatus[loanRequests[msg.sender][_loanId].requesterAddress][_loanId].isApproved= true;
          loanRequestsStatus[loanRequests[msg.sender][_loanId].requesterAddress][_loanId].dateApproved=now;

         }


   function repayAmount(uint _loanId,uint _amount) public payable{
         require(loanRequestsStatus[msg.sender][_loanId].isExists,"LoanIdis not Existed");
         require(!loanRequestsStatus[msg.sender][_loanId].isEnded,"LoanId is Ended");
         require(loanRequestsStatus[msg.sender][_loanId].isApproved,"Loan with this Id is not Approved Yet");
         require(loanRequests[msg.sender][_loanId].settledAmount<loanRequests[msg.sender][_loanId].loanAmount,"Amount is Already Settled");
         require(loanRequests[msg.sender][_loanId].settledAmount+_amount<=loanRequests[msg.sender][_loanId].loanAmount,"Settling amount is greater than loan Amount");
         require(_amount<=loanRequests[msg.sender][_loanId].loanAmount,"Amount is Greater than LoanAmount");
         require(msg.value==_amount);
         
         loanRequests[msg.sender][_loanId].lender.transfer(msg.value);
         loanRequests[msg.sender][_loanId].settledAmount+=_amount;
         loanRequests[loanRequests[msg.sender][_loanId].lender][_loanId].settledAmount+=_amount;
        }

function endLoan(uint _loanId) public{
         require(loanRequestsStatus[msg.sender][_loanId].isExists,"Loan with this Id not Exists");
         require(loanRequestsStatus[msg.sender][_loanId].isApproved,"Loan with this Id is not Approved Yet");
         require(!loanRequestsStatus[msg.sender][_loanId].isEnded,"Loan with this Id is already Ended");
         require(loanRequests[msg.sender][_loanId].settledAmount==loanRequests[msg.sender][_loanId].loanAmount,"Loan amount is not Fully Settled Yet");
    
         loanRequestsStatus[loanRequests[msg.sender][_loanId].lender][_loanId].isEnded=true;
         loanRequestsStatus[msg.sender][_loanId].isEnded=true;
        }
 function loanDetails(uint _loanId) public view returns(uint,address,string memory,string memory,string memory,address,uint) {
        
       return(
       loanRequests[msg.sender][_loanId].loanId,
       loanRequests[msg.sender][_loanId].requesterAddress,
       loanRequests[msg.sender][_loanId].name,
       loanRequests[msg.sender][_loanId].mobile, 
       loanRequests[msg.sender][_loanId].permanentAddress,
       loanRequests[msg.sender][_loanId].lender,
       loanRequests[msg.sender][_loanId].loanAmount
       );
     }
   
 function loanStatus(uint _loanId) public view returns(uint,uint,bool,bool,bool,uint) {
        
       return(
       loanRequests[msg.sender][_loanId].repaymentPeriod,
       loanRequests[msg.sender][_loanId].settledAmount,
       loanRequestsStatus[msg.sender][_loanId].isApproved,
       loanRequestsStatus[msg.sender][_loanId].isExists,
       loanRequestsStatus[msg.sender][_loanId].isEnded,
       loanRequestsStatus[msg.sender][_loanId].dateApproved
      );
     }
  function getMyLoans(uint _index) public view returns(uint,address,uint,uint) {
        
       return(
       userLoans[msg.sender][_index].loanId,
        userLoans[msg.sender][_index].lender,
        userLoans[msg.sender][_index].loanAmount,
        userLoans[msg.sender][_index].repaymentPeriod
      );
     }

function getRequests(uint _index) public view returns(uint,address,uint,string memory) {
        
       return(
       lenderRequests[msg.sender][_index].loanId,
        lenderRequests[msg.sender][_index].requester,
        lenderRequests[msg.sender][_index].loanAmount,
        lenderRequests[msg.sender][_index].contactAddress
      );
     }

  function getMyLoansLength() public view returns(uint) {
        
       return userLoans[msg.sender].length;
     }
 function getRequestsLength() public view returns(uint) {
        
       return lenderRequests[msg.sender].length;
     }

  function getAllLendersLength() public view returns(uint) {
        
       return allLenders.length;
     }

}
 
