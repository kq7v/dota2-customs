--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


"use strict";
class PlayerTips {
    constructor() {
        this.tipContainer = $.GetContextPanel().FindChildTraverse("PlayerTipsContainer");
        this.tipContainer.FindChildrenWithClassTraverse("ToastPanel").forEach(i => i.DeleteAsync(0));
        GameEvents.Subscribe_custom("PlayerTipped", event => this.PlayerTipped(event));
    }
    SetToastPlayer(toast, id, image, label) {

        var info = Game.GetPlayerInfo(id);

        var sourceImage = toast.FindChildTraverse(image);
        sourceImage.style.backgroundImage = `url("file://{images}/heroes/${Game.GetHeroImage(id, info.player_selected_hero)}.png")`;

        var sourceLabel = toast.FindChildTraverse(label);
        sourceLabel.text = info.player_name;


        if (image == "SourceHeroImage")
        {
           // sourceLabel.text = "Xeno 1x6"
        }else 
        {
           // sourceImage.style.backgroundImage = `url("file://{images}/heroes/npc_dota_hero_luna.png")`;
          //  sourceLabel.text = "kotyajopka"

        } 


        sourceImage.style.backgroundSize = "100%";


    }
    PlayerTipped(event) {


        var toast = $.CreatePanel("Panel", this.tipContainer, "TipToast", {
            class: "ToastPanel"
        });

        Game.EmitSound("UI.Tip_Player")

        toast.BLoadLayoutSnippet("PlayerTipToast");
        this.SetToastPlayer(toast, event.caster, "SourceHeroImage", "SourceHeroLabel");
        this.SetToastPlayer(toast, event.target, "TargetHeroImage", "TargetHeroLabel");

        let image = toast.FindChildTraverse("TipCustomImage")
        let icon_name =  event.image
        let icon = `url("file://{images}/custom_game/tips/tip_${icon_name}.png")`

 
        image.style.backgroundImage = icon;
        image.style.backgroundSize = "100%";

        toast.AddClass("ToastVisible");
        $.Schedule(4.5, () => {
            toast.RemoveClass("ToastVisible");
            toast.DeleteAsync(0.31);
        });
    }
}

var player_tips = new PlayerTips();