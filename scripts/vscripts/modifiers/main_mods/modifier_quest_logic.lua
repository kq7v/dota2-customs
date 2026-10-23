--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


modifier_quest_logic = class({})
function modifier_quest_logic:IsHidden()
	return true
end
function modifier_quest_logic:IsPurgable()
	return false
end
function modifier_quest_logic:RemoveOnDeath()
	return false
end
function modifier_quest_logic:OnCreated(table)
	self.parent = self:GetParent()

	self.quest_attack_logic = nil
	self.quest_damage_logic = nil
	self.quest_damage_incoming_logic = nil
	self.quest_damage_units_logic = nil

	if not IsServer() then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_quest_logic:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:GetQuest() or self.parent:GetQuest() == "" then
		return
	end

	self:StartQuest()
	self:StartIntervalThink(-1)
end

function modifier_quest_logic:StartQuest()
	print(self.parent:GetQuest())

	local name = self.parent:GetQuest()

	if name == "Troll.Quest_7" then
		self.quest_attack_logic = function(params)
			local mod = self.parent:FindModifierByName("modifier_troll_warlord_fervor_custom_speed")
			local ability = self.parent:FindAbilityByName("troll_warlord_fervor_custom")

			if ability and mod and mod:GetStackCount() >= ability:GetSpecialValueFor("max_stacks") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Slark.Quest_7" then
		self.quest_attack_logic = function(params)
			local mod = self.parent:FindModifierByName("modifier_slark_innate_custom_caster")

			if mod and mod:GetStackCount() >= self.parent.quest.number then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Furion.Quest_6" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_furion_teleportation_custom_quest") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Sand.Quest_5" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_sandking_burrowstrike_custom_quest") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Invoker.Quest_6" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_invoker_alacrity_custom") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Arc.Quest_6" then
		self.quest_attack_logic = function(params)
			if
				self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_speed")
				or self.parent:HasModifier("modifier_arc_warden_magnetic_field_custom_damage")
			then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Muerta.Quest_8" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_muerta_pierce_the_veil_custom") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Phantom.Quest_7" then
		self.quest_attack_logic = function(params)
			if self.parent:HasCd("phantom_quest_7", self.parent.quest.number) then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Terr.Quest_7" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_custom_terrorblade_metamorphosis") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Brist.Quest_8" then
		self.quest_attack_logic = function(params)
			local mod = self.parent:FindModifierByName("modifier_custom_bristleback_warpath_buff")
			local ability = self.parent:FindAbilityByName("bristleback_warpath_custom")

			if ability and mod and mod:GetStackCount() >= ability:GetSpecialValueFor("max_stacks") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Void.Quest_5" then
		self.quest_attack_logic = function(params)
			if params.target:HasModifier("modifier_custom_void_remnant_target") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Hoodwink.Quest_7" then
		self.quest_attack_logic = function(params)
			local mod = self.parent:FindModifierByName("modifier_hoodwink_scurry_custom")

			if mod and mod:GetStackCount() == 0 then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Huskar.Quest_7" then
		self.quest_attack_logic = function(params)
			if self.parent:GetHealthPercent() <= self.parent.quest.number then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Blood.Quest_5" then
		self.quest_attack_logic = function(params)
			if self.parent:GetHealthPercent() <= self.parent.quest.number then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Sven.Quest_8" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_sven_gods_strength_custom") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Snapfire.Quest_7" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_snapfire_lil_shredder_custom") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Maiden.Quest_7" then
		self.quest_attack_logic = function(params)
			if
				params.target:HasModifier("modifier_crystal_maiden_crystal_nova_custom")
				or params.target:HasModifier("modifier_crystal_maiden_freezing_field_custom_debuff")
				or params.target:HasModifier("modifier_crystal_maiden_frostbite_custom")
			then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Beast.Quest_7" then
		self.quest_attack_logic = function(params)
			local mod = self.parent:FindModifierByName("modifier_primal_beast_uproar_custom_buff")
			if mod and mod:GetStackCount() >= self.parent.quest.number then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Zuus.Quest_7" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_zuus_heavenly_jump_custom_buff") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Alch.Quest_8" then
		self.quest_attack_logic = function(params)
			if self.parent:HasModifier("modifier_alchemist_chemical_rage_custom") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Lina.Quest_7" then
		self.quest_attack_logic = function(params)
			if params.target:HasModifier("modifier_lina_fiery_soul_custom_quest") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Monkey.Quest_8" then
		self.quest_attack_logic = function(params)
			if
				params.attacker.owner
				and params.attacker.owner == self.parent
				and params.attacker:HasModifier("modifier_monkey_king_wukongs_command_custom_soldier")
			then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Bane.Quest_7" then
		self.quest_attack_logic = function(params)
			if params.target:HasModifier("modifier_bane_nightmare_custom") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Morphling.Quest_7" then
		self.quest_attack_logic = function(params)
			if self.parent:GetBaseStrength() <= 1 then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Lifestealer.Quest_5" then
		self.quest_attack_logic = function(params)
			local attacker = params.attacker
			if
				attacker:HasModifier("modifier_life_stealer_rage_custom")
				and (
					attacker == self.parent
					or (
						attacker.owner
						and attacker.owner == self.parent
						and attacker:HasModifier("modifier_life_stealer_infest_custom_legendary_creep")
					)
				)
			then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Nyx.Quest_8" then
		self.quest_attack_logic = function(params)
			if params.attacker:HasModifier("modifier_nyx_assassin_vendetta_custom_bonus") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Brood.Quest_5" then
		self.quest_attack_logic = function(params)
			if params.attacker:HasModifier("modifier_broodmother_insatiable_hunger_custom") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Stalker.Quest_8" then
		self.quest_attack_logic = function(params)
			if params.attacker:HasModifier("modifier_night_stalker_darkness_custom_active") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Jakiro.Quest_6" then
		self.quest_attack_logic = function(params)
			if
				params.target:HasModifier("modifier_jakiro_ice_path_custom_fire_debuff")
				or params.target:HasModifier("modifier_jakiro_ice_path_custom_frost_debuff")
			then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	----------------------------------------------------------------------------------------------------
	----------------------------------------------------------------------------------------------------
	----------------------------------------------------------------------------------------------------

	if name == "General.Quest_10" then
		self.quest_damage_logic = function(params)
			if params.damage_type == DAMAGE_TYPE_PHYSICAL then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "General.Quest_11" then
		self.quest_damage_logic = function(params)
			if params.damage_type == DAMAGE_TYPE_PURE then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "General.Quest_12" then
		self.quest_damage_logic = function(params)
			if params.damage_type == DAMAGE_TYPE_MAGICAL then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "General.Quest_13" then
		self.quest_damage_logic = function(params)
			if self.parent:HasModifier("modifier_item_black_king_bar_custom_active") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Jugg.Quest_5" then
		self.quest_damage_logic = function(params)
			if
				params.inflictor
				and (
					params.inflictor:GetName() == "custom_juggernaut_blade_fury"
					or params.inflictor:GetName() == "custom_juggernaut_whirling_blade_custom"
				)
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Jugg.Quest_8" then
		self.quest_damage_logic = function(params)
			if self.parent:HasModifier("modifier_custom_juggernaut_omnislash") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Huskar.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "custom_huskar_burning_spear" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Never.Quest_7" then
		self.quest_damage_logic = function(params)
			if params.unit:HasModifier("modifier_nevermore_requiem_fear") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Queen.Quest_7" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "custom_queenofpain_scream_of_pain" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Legion.Quest_5" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "custom_legion_commander_overwhelming_odds" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Brist.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "bristleback_quill_spray_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Puck.Quest_7" then
		self.quest_damage_logic = function(params)
			if self.parent:HasCd("puck_quest_7", self.parent.quest.number) then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Puck.Quest_8" then
		self.quest_attack_logic = function(params)
			if params.target:HasModifier("modifier_custom_puck_dream_coil") then
				self.parent:UpdateQuest(1)
			end
		end
		return
	end

	if name == "Void.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "void_spirit_astral_step_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Ember.Quest_6" then
		self.quest_damage_logic = function(params)
			if
				not params.inflictor and self.parent:HasModifier("modifier_ember_spirit_sleight_of_fist_custom_caster")
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Ember.Quest_8" then
		self.quest_damage_logic = function(params)
			if
				params.inflictor
				and (
					params.inflictor:GetName() == "ember_spirit_activate_fire_remnant_custom"
					or params.inflictor:GetName() == "ember_spirit_fire_remnant_burst"
				)
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Pudge.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "custom_pudge_rot") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Hoodwink.Quest_5" then
		self.quest_damage_logic = function(params)
			if not params.inflictor and self.parent:HasModifier("modifier_hoodwink_acorn_shot_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Troll.Quest_8" then
		self.quest_damage_logic = function(params)
			if
				self.parent:HasModifier("modifier_troll_warlord_battle_trance_custom")
				or params.unit:HasModifier("modifier_troll_warlord_battle_trance_custom")
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Lina.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "lina_laguna_blade_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Axe.Quest_7" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "axe_counter_helix_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "General.Quest_15" then
		self.quest_damage_logic = function(params)
			if self.parent:HasModifier("modifier_quest_blink") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Anti.Quest_6" then
		self.quest_damage_logic = function(params)
			if self.parent:HasModifier("modifier_antimage_blink_custom_quest") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Beast.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "primal_beast_pulverize_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Templar.Quest_6" then
		self.quest_damage_logic = function(params)
			if
				params.damage_type == DAMAGE_TYPE_PHYSICAL
				and self.parent:HasModifier("modifier_templar_assassin_meld_custom_quest")
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Templar.Quest_8" then
		self.quest_damage_logic = function(params)
			if
				params.damage_type == DAMAGE_TYPE_MAGICAL
				and params.inflictor
				and (params.inflictor:GetName() == "templar_assassin_psionic_trap_custom")
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Monkey.Quest_5" then
		self.quest_damage_logic = function(params)
			if
				not params.inflictor and self.parent:HasModifier("modifier_monkey_king_boundless_strike_custom_crit")
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Mars.Quest_6" then
		self.quest_damage_logic = function(params)
			if not params.inflictor and self.parent:HasModifier("modifier_mars_gods_rebuke_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Zuus.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "zuus_lightning_bolt_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Leshrac.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "leshrac_diabolic_edict_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Leshrac.Quest_7" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "leshrac_lightning_storm_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Leshrac.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "leshrac_pulse_nova_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Maiden.Quest_8" then
		self.quest_damage_logic = function(params)
			if
				params.inflictor
				and (
					params.inflictor:GetName() == "crystal_maiden_freezing_field_custom"
					or params.inflictor:GetName() == "crystal_maiden_freezing_field_legendary"
				)
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Maiden.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.unit:HasModifier("modifier_crystal_maiden_frostbite_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Snapfire.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "snapfire_mortimer_kisses_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Sven.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "sven_great_cleave_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Blood.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "bloodseeker_rupture_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Ogre.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and (params.inflictor:GetName() == "ogre_magi_ignite_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Sniper.Quest_7" then
		self.quest_damage_logic = function(params)
			if
				self.parent.quest.number
				and (self.parent:GetAbsOrigin() - params.unit:GetAbsOrigin()):Length2D() >= self.parent.quest.number
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Muerta.Quest_7" then
		self.quest_damage_logic = function(params)
			if self.parent.muerta_e then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Pangolier.Quest_5" then
		self.quest_damage_logic = function(params)
			if self.parent:HasModifier("modifier_pangolier_swashbuckle_custom_attacks") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Arc.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.attacker:IsTempestDouble() and params.attacker.owner and params.attacker.owner == self.parent then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Invoker.Quest_7" then
		self.quest_damage_logic = function(params)
			if
				params.inflictor
				and (
					params.inflictor:GetName() == "invoker_sun_strike_custom"
					or params.inflictor:GetName() == "invoker_chaos_meteor_custom"
				)
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Razor.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "razor_eye_of_the_storm_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Sand.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "sandking_epicenter_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Abaddon.Quest_5" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "abaddon_death_coil_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Drow.Quest_7" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "drow_ranger_multishot_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Drow.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.unit:IsSilenced() then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Phantom.Quest_6" then
		self.quest_damage_logic = function(params)
			if
				params.damage_type == DAMAGE_TYPE_MAGICAL
				and self.parent:HasCd("phantom_quest_6", self.parent.quest.number)
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Sky.Quest_5" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "skywrath_mage_arcane_bolt_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Slark.Quest_5" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "slark_dark_pact_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Slark.Quest_8" then
		self.quest_damage_logic = function(params)
			if self.parent:HasModifier("modifier_slark_shadow_dance_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Centaur.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "centaur_double_edge_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Enigma.Quest_7" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "enigma_midnight_pulse_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Bane.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "bane_brain_sap_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Bane.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "bane_fiends_grip_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Morphling.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "morphling_adaptive_strike_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Morphling.Quest_8" then
		self.quest_damage_logic = function(params)
			if self.parent:HasModifier("modifier_morphling_replicate_custom") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Lifestealer.Quest_8" then
		self.quest_damage_logic = function(params)
			local attacker = params.attacker
			if
				(
					attacker.owner
					and attacker.owner == self.parent
					and attacker:HasModifier("modifier_life_stealer_infest_custom_legendary_creep")
				)
				or (
					(params.inflictor and params.inflictor:GetName() == "life_stealer_infest_custom")
					or self.parent:HasModifier("modifier_life_stealer_infest_custom")
				)
			then
				self.parent:UpdateQuest(params.damage)
			end
		end
		return
	end

	if name == "Tinker.Quest_5" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "tinker_laser_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Tinker.Quest_8" then
		self.quest_damage_logic = function(params)
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_tinker_rearm_custom_quest",
				{ duration = self.parent.quest.number }
			)
		end
		return
	end

	if name == "Nyx.Quest_6" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "nyx_assassin_jolt_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Stalker.Quest_5" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "night_stalker_void_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Wraith.Quest_5" then
		self.quest_damage_logic = function(params)
			if params.unit:HasModifier("modifier_skeleton_king_hellfire_blast_custom_quest") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Marci.Quest_5" then
		self.quest_damage_logic = function(params)
			if
				params.inflictor
				and (
					params.inflictor:GetName() == "marci_grapple_custom"
					or params.inflictor:GetName() == "marci_dispose_hits"
				)
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Marci.Quest_7" then
		self.quest_damage_logic = function(params)
			if not params.inflictor and IsValid(self.parent.bodyguard_shield) then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Jakiro.Quest_5" then
		self.quest_damage_logic = function(params)
			if params.inflictor and params.inflictor:GetName() == "jakiro_dual_breath_custom" then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Jakiro.Quest_7" then
		self.quest_damage_logic = function(params)
			if
				params.inflictor
				and (
					params.inflictor:GetName() == "jakiro_liquid_fire_custom"
					or params.inflictor:GetName() == "jakiro_liquid_frost_custom"
				)
			then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Kunkka.Quest_7" then
		self.quest_damage_logic = function(params)
			if self.parent:HasModifier("modifier_kunkka_xmark_custom_target") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Kunkka.Quest_8" then
		self.quest_damage_logic = function(params)
			if params.unit:HasCd("kunkka_quest_8", self.parent.quest.number) then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	----------------------------------------------------------------------------------------------------
	----------------------------------------------------------------------------------------------------
	----------------------------------------------------------------------------------------------------

	if name == "Jugg.Quest_7" then
		self.quest_damage_incoming_logic = function(params)
			if self.parent:HasModifier("modifier_custom_juggernaut_healing_ward_aura") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Sven.Quest_7" then
		self.quest_damage_incoming_logic = function(params)
			if self.parent:HasModifier("modifier_sven_warcry_custom_quest") then
				self.parent:UpdateQuest(math.floor(params.original_damage))
			end
		end
		return
	end

	if name == "Axe.Quest_5" then
		self.quest_damage_incoming_logic = function(params)
			if self.parent:HasModifier("modifier_axe_berserkers_call_custom_buff") then
				self.parent:UpdateQuest(math.floor(params.original_damage))
			end
		end
		return
	end

	if name == "Nyx.Quest_7" then
		self.quest_damage_incoming_logic = function(params)
			if self.parent:HasModifier("modifier_nyx_assassin_spiked_carapace_custom") then
				self.parent:UpdateQuest(math.floor(params.original_damage))
			end
		end
		return
	end

	if name == "Furion.Quest_7" then
		self.quest_damage_units_logic = function(params)
			if params.attacker.is_treant then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Terr.Quest_5" then
		self.quest_damage_units_logic = function(params)
			if params.attacker:HasModifier("modifier_custom_terrorblade_reflection_unit") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Brood.Quest_8" then
		self.quest_damage_units_logic = function(params)
			if params.attacker:HasModifier("modifier_broodmother_spawn_spiderlings_custom_spider") then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end

	if name == "Wraith.Quest_6" then
		self.quest_damage_units_logic = function(params)
			if params.attacker.is_wk_skelet then
				self.parent:UpdateQuest(math.floor(params.damage))
			end
		end
		return
	end
end