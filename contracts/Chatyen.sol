pragma solidity ^0.8.0;

contract Chatayen{
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    struct ChatBot{
        address creator;
        address owner;
        string nameOfChatbot;
        string descOfChatbot;
        uint256 chatbotId;
        uint256 buyPrice;
        uint256 leasePrice;
        uint256 leaseDuration;
        string link;
        bool isAvailable;
        address leasedTo;
    }

    ChatBot[] public chatBots;
    uint256 public count;
    mapping(address=>uint256) public balances;
    uint256 public platformUsingFees = 1 ether;
    /// events
    event ChatBotCreated(uint256 chatbotID, address owner);
    event ChatbotBought(uint256 chatbotId, address buyer);
    event ChatbotLeased(uint256 chatbotId, address leaser, uint256 leaseDuration);
    event ChatbotReturned(uint256 chatbotId);
    event ChatbotRegistered(uint256 chatbotId, address owner);
    event ChatbotUnregistered(uint256 chatbotId, address owner);
    event BalanceWithdrawn(address owner, uint256 amount);

    // access modifiers
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /// business logic

     function addChatbot(string memory _name, string memory _description, uint256 _buyPrice, uint256 _leasePrice, uint256 _leaseDuration, string memory _link) public payable {
        require(msg.value >= platformUsingFees, "Kindly ensure that you pay to use the platform");
        ChatBot storage c = chatBots.push();
        c.creator=msg.sender;
        c.nameOfChatbot=_name;
        c.descOfChatbot=_description;
        c.buyPrice=_buyPrice;
        c.leasePrice=_leasePrice;
        c.leaseDuration=_leaseDuration;
        c.link = _link;
        c.isAvailable = true;
        c.chatbotId = count;
        count++;
        emit ChatBotCreated(chatBots.length-1, msg.sender);
    }

  function buyChatbot(uint256 _chatbotId) public payable returns(string memory) {
        require(_chatbotId < chatBots.length, "Invalid chatbot id.");
        ChatBot storage chatbot = chatBots[_chatbotId];
        require(chatbot.creator != msg.sender, "You already own this chatbot.");
        require(chatbot.owner != msg.sender, "You already own this chatbot good sire");
        require(chatbot.isAvailable != false , "Sorry the bot is not available" ); 
        require(msg.value >= chatbot.buyPrice * 1 ether, "Amount must be greater than the buyPrice.");
        require(chatbot.leasedTo == address(0), "Sorry this bot has already been leased");
        require(chatbot.leasedTo != msg.sender, "Sorry you already own the chatbot");
        count++;
        balances[chatbot.creator] += msg.value;
        payable (chatbot.creator).transfer(msg.value);
        chatbot.owner = msg.sender;
        chatbot.isAvailable = false;
        emit ChatbotBought(_chatbotId, msg.sender);
        return "success";
    }

    function leaseChatbot(uint256 _chatbotId) public payable returns(string memory){
        ChatBot storage chatbot = chatBots[_chatbotId];
        require(chatbot.isAvailable == true, "Chatbot is not available for lease.");
        require(chatbot.creator != msg.sender, "You already own this chatbot.");
        require(chatbot.owner != msg.sender, "You already own this chatbot good sire");
        require(msg.sender != chatbot.leasedTo, "You are chatbot.");
        require(msg.value >= chatbot.leasePrice, "Sorry going to need some more cash from you sire.");
        payable(chatbot.creator).transfer(msg.value);
        uint256 leaseExpiration = block.timestamp + chatbot.leaseDuration;
        chatbot.isAvailable = false;
        chatbot.leasedTo = msg.sender;
        chatbot.leaseDuration = leaseExpiration;
        balances[chatbot.creator] += msg.value;
        emit ChatbotLeased(_chatbotId, msg.sender, chatbot.leaseDuration);
        return "success";
    }
    
    function checkAccess(uint256 _chatbotId) public {
    require(_chatbotId < chatBots.length, "Invalid chatbot id.");
    ChatBot storage chatbot = chatBots[_chatbotId];
    require(chatbot.owner == msg.sender, "You are not the owner of this chatbot.");
    require(chatbot.isAvailable, "Chatbot is not for lease.");
    require(chatbot.creator != msg.sender, "You made this chatbot this chatbot.");
    uint256 leaseEndTime = chatbot.leaseDuration;
    require(block.timestamp >= leaseEndTime, "Lease period has not expired.");
    chatbot.isAvailable = true;
    chatbot.leasedTo= address(0);
    chatbot.leaseDuration = 0;
    emit ChatbotUnregistered(_chatbotId, msg.sender);
}

    function returnChatbot(uint256 _chatbotId) public {
        ChatBot storage chatbot = chatBots[_chatbotId]; 
        require(chatbot.isAvailable != true, "Chatbot is not leased.");
        require(msg.sender == chatbot.leasedTo, "You are not the lessee of this chatbot.");
        require(block.timestamp >= chatbot.leaseDuration, "Lease is not yet expired.");
        chatbot.isAvailable = true;
        chatbot.leasedTo = address(0);
        chatbot.leaseDuration = 0;
        emit ChatbotReturned(_chatbotId);
    }

function withdraw() public{
    // uint256 balance = balances[msg.sender];
    // require(balance > 0, "No funds to withdraw.");
    // balances[msg.sender] = 0;
    payable(owner).transfer(address(this).balance);

}

function confirmAccess(uint _chatbotID) public view {
    require(_chatbotID < chatBots.length, "Invalid chatbot id.");
    ChatBot storage chatbot = chatBots[_chatbotID];
    require(chatbot.owner == msg.sender, "You are not the owner of this chatbot.");
    require(chatbot.isAvailable != true, "Chatbot is not for lease.");
    require(chatbot.creator != msg.sender, "You made this chatbot this chatbot.");
     
}

///getters
function getChatbots() public view returns(ChatBot[] memory) {
    return chatBots;
}


}