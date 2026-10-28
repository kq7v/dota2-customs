--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


const TEXT_FIELD = $("#FeedbackText");
const SEND_BUTTON = $("#FeedbackSendButton");
const MAX_SYMBOLS_FIELD = $("#MaxSymbols");
const MAX_SYMBOLS = 1000;
var cooldown = 2;
const textLength = () => {
	return TEXT_FIELD.text.length;
};

function UpdateFeedbackText() {
	SEND_BUTTON.SetHasClass("Blocked", TEXT_FIELD.text == "");
	const overLimit = textLength() > MAX_SYMBOLS;
	if (overLimit) {
		TEXT_FIELD.text = TEXT_FIELD.text.substring(0, MAX_SYMBOLS);
	}
	MAX_SYMBOLS_FIELD.SetHasClass("max", overLimit);
	MAX_SYMBOLS_FIELD.SetDialogVariable("curr", textLength());
}

function CountDown () {

    if (cooldown>0){
      $.Schedule(1,CountDown);  
    } else {
      SEND_BUTTON.SetHasClass("Cooldown", false);
    }
    cooldown = cooldown-1;
}


function SendFeedback() {
	const text = TEXT_FIELD.text;
	if (!SEND_BUTTON.BHasClass("Cooldown") && text != "") {
		SEND_BUTTON.SetHasClass("Cooldown", true);
		GameEvents.SendCustomGameEventToServer("SendFeedback", {
			text: text,
		});
		TEXT_FIELD.text = "";
		Game.EmitSound("General.ButtonClick");
	}
	if(typeof CountDown === "function") {
		 cooldown = 2;
         CountDown();
    }
}


function FeedbackTooltip() {
	if (SEND_BUTTON.BHasClass("Cooldown")) {
		$.DispatchEvent("DOTAShowTextTooltip", SEND_BUTTON, $.Localize("#feedback_cooldown"));
	} else if (SEND_BUTTON.BHasClass("Blocked")) {
		$.DispatchEvent("DOTAShowTextTooltip", SEND_BUTTON, $.Localize("#feedback_blocked"));
	}
}

function CloseFeedback() {
	const feedbackRoot = FindDotaHudElement("FeedbackInput").GetParent();
	feedbackRoot.ToggleClass("show");
	Game.EmitSound("ui_chat_slide_in");
}

function InitFeedback(){

   var playerInfo = Game.GetPlayerInfo( Players.GetLocalPlayer() );
   if ( !playerInfo )
       return;
   var playerId = playerInfo.player_id;
   var feedbackInfo = CustomNetTables.GetTableValue("player_info", "feedback_info_"+playerId)
   
   //如果有未读消息
   var unread_flag = false;
   if (feedbackInfo)
   {
      for(var index in feedbackInfo) {
        
        var message_flag = false;

      	if (feedbackInfo[index].message!=undefined && feedbackInfo[index].message!="") 
        {
	        var panelID = "feedback_player_message_"+index;
	        var panel = $('#FeedbackReplyContainer').FindChildTraverse(panelID);
	        if (panel == undefined && panel == null) {
	            panel = $.CreatePanel("Panel", $('#FeedbackReplyContainer'), panelID);
	            panel.BLoadLayoutSnippet("PlayerMessage");
	            panel.FindChildTraverse("PlayerMessageText").text=feedbackInfo[index].message
	        }
	        message_flag = true;
	    }

        if (feedbackInfo[index].reply!=undefined && feedbackInfo[index].reply!="") 
        {
        	    var panelID = "feedback_author_reply_"+index;
		        var panel = $('#FeedbackReplyContainer').FindChildTraverse(panelID);
		        if (panel == undefined && panel == null) {
		            panel = $.CreatePanel("Panel", $('#FeedbackReplyContainer'), panelID);
		            panel.BLoadLayoutSnippet("AuthorReply");
		            var text = ""
		            //如果是反馈，感谢反馈, 其他情况是站内信
		            if (message_flag)
		            {
		            	text=text+$.Localize("#author_thanks_for_feedback")
		            }
		            text=text+feedbackInfo[index].reply
		            panel.FindChildTraverse("AuthorReplyText").text=text
		        }
        }
        
        if (feedbackInfo[index].read_flag=="0")
        {
               unread_flag=true;
        }
      }
      $('#FeedbackReply').SetHasClass("Block",true)
    }
    //如果有未读消息 ,不重复加闪烁
    if (unread_flag && !FindDotaHudElement("FeedbackColor").BHasClass("Clicked"))
    {	
    	FindDotaHudElement("FeedbackColor").SetHasClass("Glow",true)
    }
}



(function () {
	MAX_SYMBOLS_FIELD.SetDialogVariable("max", MAX_SYMBOLS);
	MAX_SYMBOLS_FIELD.SetDialogVariable("curr", 0);
	GameEvents.Subscribe("InitFeedback", InitFeedback);
})();