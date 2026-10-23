--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_far",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_tracker",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_legendary",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_legendary_caster",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_double_7"
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_scepter_tp_invun",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_lowhp",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_hero_6"
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_items",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_scepter_tp",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_bkb_cd",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_arc_warden_double_4"
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_auto_damage",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_arc_warden_tempest_double_custom_scepter",
	"abilities/arc_warden/arc_warden_tempest_double_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Scepter" }
)

arc_warden_tempest_double_custom = class({})
arc_warden_tempest_double_custom.talents = {}

arc_warden_tempest_double_custom.cd_items = {
	["item_sheepstick_custom"] = true,
	["item_abyssal_blade_custom"] = true,
}

arc_warden_tempest_double_custom.give_buffs = {
	["modifier_item_ultimate_scepter_consumed"] = true,
	["modifier_item_aghanims_shard"] = true,
	["modifier_item_moon_shard_consumed"] = true,
}

function arc_warden_tempest_double_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_tempest_eyes.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lone_druid/lone_druid_bear_blink_end.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_demonartist/demonartist_engulf_disarm/items2_fx/heavens_halberd.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_wraith_prj.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/legendary_tp_start.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/legendary_tp_end.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/legendary_tp_tube.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/legendary_tp_tube_tempest.vpcf", context)
	PrecacheResource("particle", "particles/patrol/rare_orb_patrol.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/tempest_reduce.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/tempest_tether.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_proc_.vpcf", context)
	PrecacheResource("particle", "particles/patrol/rare_orb_patrol.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_lowhp_.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/vindicators_axe_armor.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/rune_doubledamage_owner.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/rune_arcane_owner.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/rune_haste_owner.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/tempest_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/double_legendary_shields.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/tempest_eam.vpcf", context)
	PrecacheResource("particle", "particles/razor/link_purge.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/scepter_shields.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_perma.vpcf", context)
	PrecacheResource("particle", "particles/enigma/summon_spell_damage.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_kez/status_effect_kez_shield.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf", context)
	PrecacheResource("particle", "particles/arc_warden/field_attack.vpcf", context)
end

function arc_warden_tempest_double_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_crit = 0,
			r1_chance = caster:GetTalentValue("modifier_arc_warden_double_1", "chance", true),
			r1_heal = caster:GetTalentValue("modifier_arc_warden_double_1", "heal", true) / 100,

			has_r3 = 0,
			r3_damage = 0,
			r3_cd = caster:GetTalentValue("modifier_arc_warden_double_3", "cd", true),
			r3_range = caster:GetTalentValue("modifier_arc_warden_double_3", "range", true),

			has_r4 = 0,
			r4_damage = caster:GetTalentValue("modifier_arc_warden_double_4", "damage", true),
			r4_talent_cd = caster:GetTalentValue("modifier_arc_warden_double_4", "talent_cd", true),
			r4_duration = caster:GetTalentValue("modifier_arc_warden_double_4", "duration", true),
			r4_status = caster:GetTalentValue("modifier_arc_warden_double_4", "status", true),

			has_h6 = 0,
			h6_bonus = caster:GetTalentValue("modifier_arc_warden_hero_6", "bonus", true),
			h6_damage_reduce = caster:GetTalentValue("modifier_arc_warden_hero_6", "damage_reduce", true),
			h6_magic = caster:GetTalentValue("modifier_arc_warden_hero_6", "magic", true),
			h6_health = caster:GetTalentValue("modifier_arc_warden_hero_6", "health", true),
			h6_radius = caster:GetTalentValue("modifier_arc_warden_hero_6", "radius", true),
		}
	end

	if caster:HasTalent("modifier_arc_warden_double_1") then
		self.talents.has_r1 = 1
		self.talents.r1_crit = caster:GetTalentValue("modifier_arc_warden_double_1", "crit")
		caster:AddRecordDestroyEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_arc_warden_double_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_arc_warden_double_3", "damage")
	end

	if caster:HasTalent("modifier_arc_warden_double_4") then
		self.talents.has_r4 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_arc_warden_hero_6") then
		self.talents.has_h6 = 1
	end
end

function arc_warden_tempest_double_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() or self:GetCaster():IsTempestDouble() then
		return
	end
	return "modifier_arc_warden_tempest_double_custom_tracker"
end

function arc_warden_tempest_double_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level)
end

function arc_warden_tempest_double_custom:OnInventoryContentsChanged()
	local tempest = self.caster.tempest_double_tempest
	if not IsValid(tempest) then
		return
	end
	if not tempest:IsAlive() then
		return
	end

	tempest:AddNewModifier(self.caster, self, "modifier_arc_warden_tempest_double_custom_items", {})
end

function arc_warden_tempest_double_custom:OnAbilityPhaseStart()
	return not self.caster:IsTempestDouble()
end

function arc_warden_tempest_double_custom:OnSpellStart(new_point, new_duration)
	local point = new_point and new_point or self:GetCursorPosition()

	local tempest = self:GetHerotempest()

	if not tempest or tempest:IsNull() then
		return
	end

	tempest:RespawnHero(false, false)

	self:ModifyTempest(tempest)

	tempest:SetHealth(self.caster:GetMaxHealth())
	tempest:SetMana(self.caster:GetMaxMana())

	tempest:Purge(true, true, false, true, true)
	tempest:SetAbilityPoints(0)
	tempest:SetHasInventory(false)
	tempest:SetCanSellItems(false)
	tempest.owner = self.caster
	tempest:RemoveModifierByName("modifier_fountain_invulnerability")
	tempest:AddNewModifier(self.caster, self, "modifier_arc_warden_tempest_double", {})
	Timers:CreateTimer(FrameTime(), function()
		tempest:RemoveModifierByName("modifier_fountain_invulnerability")
	end)

	self.caster.tempest_double_tempest = tempest

	tempest:RemoveGesture(ACT_DOTA_DIE)

	FindClearSpaceForUnit(tempest, point, true)

	local duration = nil
	if not self.caster:HasScepter() then
		duration = new_duration and new_duration or self.duration
		tempest:AddNewModifier(self.caster, self, "modifier_kill", { duration = duration })
	end
	tempest:AddNewModifier(self.caster, self, "modifier_arc_warden_tempest_double_custom", { duration = duration })

	if new_point then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	local particle2 = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		tempest
	)
	ParticleManager:SetParticleControlEnt(
		particle2,
		0,
		tempest,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		tempest:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle2)

	self.caster:EmitSound("Hero_ArcWarden.TempestDouble")
end

function arc_warden_tempest_double_custom:OnProjectileHit(target, vLocation)
	if not target then
		return
	end
	target:EmitSound("Arc.Tempest_attack_end")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_arc_warden_tempest_double_custom_auto_damage",
		{ duration = FrameTime() }
	)
	self.caster:PerformAttack(target, true, true, true, true, false, false, false)
	self.caster:RemoveModifierByName("modifier_arc_warden_tempest_double_custom_auto_damage")
end

function arc_warden_tempest_double_custom:GetHerotempest()
	if not self.caster or self.caster:IsNull() then
		return
	end

	if not self.tempest then
		if self.caster.tempest_double_tempest then
			self.tempest = self.caster.tempest_double_tempest
		else
			local tempest = CreateUnitByName(
				self.caster:GetUnitName(),
				self.caster:GetAbsOrigin(),
				true,
				self.caster,
				self.caster,
				self.caster:GetTeamNumber()
			)
			local tempest_ability = tempest:FindAbilityByName(self:GetName())

			tempest:AddNewModifier(self.caster, self, "modifier_arc_warden_tempest_double", {})
			tempest:AddNewModifier(tempest, tempest_ability, "modifier_arc_warden_tempest_double_custom_tracker", {})
			local particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_arc_warden/arc_warden_tempest_eyes.vpcf",
				PATTACH_ABSORIGIN,
				tempest
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				tempest,
				PATTACH_POINT_FOLLOW,
				"attach_head",
				tempest:GetAbsOrigin(),
				true
			)

			tempest.talents = {}

			FireGameEvent("save_abilities", {
				ent_index = tempest:entindex(),
			})

			tempest.owner = self.caster
			tempest.is_arc_tempest = true
			tempest:SetUnitCanRespawn(true)
			tempest:SetRespawnsDisabled(true)
			tempest:RemoveModifierByName("modifier_fountain_invulnerability")
			tempest.IsRealHero = function()
				return true
			end
			tempest.IsMainHero = function()
				return false
			end
			tempest.IsTempestDouble = function()
				return true
			end
			tempest:SetControllableByPlayer(self.caster:GetPlayerOwnerID(), true)
			tempest:SetRenderColor(0, 0, 190)
			self.tempest = tempest

			local mod = self.caster:FindModifierByName("modifier_arc_warden_tempest_double_custom_tracker")
			if mod then
				mod.tempest_init = false
			end
		end
	end

	return self.tempest
end

function arc_warden_tempest_double_custom:ReconnectProc()
	if not IsServer() then
		return
	end
	if not IsValid(self.caster.tempest_double_tempest) then
		return
	end

	local mod = self.caster.tempest_double_tempest:FindModifierByName("modifier_arc_warden_tempest_double_custom")
	local duration = nil
	local point = nil
	if mod then
		duration = mod:GetRemainingTime()
		point = self.caster.tempest_double_tempest:GetAbsOrigin()
	end

	self.caster.tempest_double_tempest:RemoveSelf()
	self.caster.tempest_double_tempest = nil
	self.tempest = nil

	if point then
		self:OnSpellStart(point, duration)
	end
end

function arc_warden_tempest_double_custom:ManageItems(tempest)
	if not IsServer() then
		return
	end
	if not tempest or tempest:IsNull() then
		return
	end

	if not self.caster or self.caster:IsNull() then
		return
	end

	for i = 0, 16 do
		local tempest_item = tempest:GetItemInSlot(i)
		if tempest_item then
			UTIL_Remove(tempest_item)
		end
	end

	for itemSlot = 0, 16 do
		local itemName = self.caster:GetItemInSlot(itemSlot)
		if
			itemName
			and itemName:GetName() ~= "item_rapier_custom"
			and itemName:GetName() ~= "item_gem"
			and itemName:GetName() ~= "item_patrol_necro"
			and itemName:IsPermanent()
		then
			local newItem = CreateItem(itemName:GetName(), nil, nil)
			tempest:AddItem(newItem)

			if IsValid(newItem) then
				if itemName and itemName:GetCurrentCharges() > 0 then
					newItem:SetCurrentCharges(itemName:GetCurrentCharges())
				end
				tempest:SwapItems(newItem:GetItemSlot(), itemSlot)

				if
					self.cd_items[itemName:GetName()]
					and itemName:GetCooldownTimeRemaining() > 0
					and newItem:GetCooldownTimeRemaining() <= itemName:GetCooldownTimeRemaining()
				then
					newItem:StartCooldown(itemName:GetCooldownTime())
				end

				newItem:SetSellable(false)
				newItem:SetDroppable(false)
				newItem:SetShareability(ITEM_FULLY_SHAREABLE)
				newItem:SetPurchaser(nil)
			end
		end
	end
end

function arc_warden_tempest_double_custom:ManageBuffs(tempest)
	if not IsServer() then
		return
	end
	if not tempest or tempest:IsNull() then
		return
	end

	if not self.caster or self.caster:IsNull() then
		return
	end

	while tempest:GetLevel() < self.caster:GetLevel() do
		tempest:HeroLevelUp(false)
	end

	tempest:SetAbilityPoints(0)

	if active_talents[self.caster:GetId()] then
		local need_refresh = false

		for talent, data in pairs(active_talents[self.caster:GetId()]) do
			if data.allow_illusion == 1 then
				if not tempest.talents[talent] then
					tempest.talents[talent] = 0
				end

				if tempest.talents[talent] ~= data.level or tempest.global_refresh then
					need_refresh = true
					tempest.talents[talent] = data.level
					tempest:ProcTrigger(talent)

					FireGameEvent("talent_added", {
						ent_index = tempest:entindex(),
						talent = talent,
						level = data.level,
					})
				end
			end
		end
		if need_refresh then
			if IsValid(tempest.stats_tracker) then
				tempest:AddNewModifier(tempest, tempest.stats_tracker.ability, "modifier_general_stats", {})
			end
		end
		tempest.global_refresh = nil
	end

	for _, modifier in pairs(self.caster:FindAllModifiers()) do
		if modifier.StackOnIllusion == true or self.give_buffs[modifier:GetName()] then
			local mod = tempest:FindModifierByName(modifier:GetName())
			local ability = modifier:GetAbility()
			local cast_ability = nil

			if ability and tempest:HasAbility(ability:GetName()) then
				cast_ability = tempest:FindAbilityByName(ability:GetName())
			end

			if not mod then
				mod = tempest:AddNewModifier(tempest, cast_ability, modifier:GetName(), {})
			end
			if mod then
				mod:SetStackCount(modifier:GetStackCount())
			end
		end
	end

	for i = 0, 24 do
		local ability = self.caster:GetAbilityByIndex(i)
		if ability then
			local tempest_ability = tempest:FindAbilityByName(ability:GetAbilityName())
			if tempest_ability then
				tempest_ability:SetLevel(ability:GetLevel())

				if ability:GetAbilityName() == "arc_warden_tempest_double_custom" then
					local teleport = tempest:FindAbilityByName("arc_warden_tempest_double_custom_reunion")
					if self.caster:HasScepter() and teleport and teleport:IsHidden() then
						tempest:SwapAbilities(tempest_ability:GetAbilityName(), teleport:GetName(), false, true)
					end
					tempest_ability:SetActivated(false)
				end
			end
		end
	end

	tempest:CalculateStatBonus(true)
end

function arc_warden_tempest_double_custom:ModifyTempest(tempest)
	if not IsServer() then
		return
	end
	if not self.caster or self.caster:IsNull() then
		return
	end

	tempest:AddNewModifier(tempest, self, "modifier_arc_warden_tempest_double_custom_items", {})

	self:ManageBuffs(tempest)
end

modifier_arc_warden_tempest_double_custom = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom:OnCreated()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.parent:AddDeathEvent(self, true)

	self.far_distance = self.ability.far_distance
	self.damage_reduce = self.ability.damage_reduce
	self.health_loss = self.ability.health_loss

	if not IsServer() then
		return
	end
	self.has_scepter = self.caster:HasScepter()

	self.ability:EndCd()
	if self.has_scepter and not self.ability:IsHidden() then
		self.caster:SwapAbilities("arc_warden_tempest_double_custom_reunion", self.ability:GetName(), true, false)
	end

	self:StartIntervalThink(0.5)

	local tracker = self.parent:FindAbilityByName(self.ability:GetName()).tracker
	self.parent:AddLifesteal(self, {
		name = "modifier_arc_warden_double_1",
		type = 2,
		text = true,
		heal_unit = self.caster,
		proc = "LifestealSound",
		value = function(params)
			if not tracker.records[params.record] then
				return 0
			end
			return self.ability.talents.r1_heal
		end,
	})

	local counter = 0
	Timers:CreateTimer(FrameTime(), function()
		local wearables_list = self.parent:GetPlayerWearables()
		if wearables_list then
			for _, item_handle in pairs(wearables_list) do
				item_handle:SetRenderColor(0, 0, 190)
			end
		end
		counter = counter + 1
		if counter >= 20 then
			return
		end
		return FrameTime()
	end)
end

function modifier_arc_warden_tempest_double_custom:LifestealSound(params)
	params.unit:EmitSound("Arc.Field_crit")
end

function modifier_arc_warden_tempest_double_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local length = (self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D()
	if length > self.far_distance and self.caster:IsAlive() then
		self.parent:AddNewModifier(self.caster, self.ability, "modifier_arc_warden_tempest_double_custom_far", {})
	else
		self.parent:RemoveModifierByName("modifier_arc_warden_tempest_double_custom_far")
	end
end

function modifier_arc_warden_tempest_double_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	if self.has_scepter and self.ability:IsHidden() then
		self.caster:SwapAbilities("arc_warden_tempest_double_custom_reunion", self.ability:GetName(), false, true)
	end

	if not IsValid(self.parent) then
		return
	end

	local parent = self.parent
	local modifier_hero_wearables_system = parent:FindModifierByName("modifier_hero_wearables_system")
	Timers:CreateTimer(2.1, function()
		if IsValid(parent) and not parent:IsAlive() and modifier_hero_wearables_system then
			modifier_hero_wearables_system.NoDraw = true
			modifier_hero_wearables_system:AddNoDrawMod(modifier_hero_wearables_system)
			parent:AddNoDraw()
		end
	end)
end

function modifier_arc_warden_tempest_double_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_arc_warden_tempest_double_custom:GetModifierSpellAmplify_Percentage(params)
	if IsServer() and params.inflictor and params.inflictor:GetName() == "arc_warden_spark_wraith_custom_legendary" then
		return
	end
	return self.damage_reduce
end

function modifier_arc_warden_tempest_double_custom:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

function modifier_arc_warden_tempest_double_custom:DeathEvent(params)
	if not IsServer() then
		return
	end
	if not self.parent.owner or self.parent.owner ~= params.unit then
		return
	end

	local damage = self.parent:GetMaxHealth() * self.health_loss / 100

	self.parent:GenericParticle("particles/units/heroes/hero_lone_druid/lone_druid_bear_blink_end.vpcf")
	self.parent:SetHealth(math.max(1, self.parent:GetHealth() - damage))
	self.parent:SendNumber(6, damage)
end

modifier_arc_warden_tempest_double_custom_far = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_far:GetEffectName()
	return "particles/enigma/summon_spell_damage.vpcf"
end
function modifier_arc_warden_tempest_double_custom_far:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_arc_warden_tempest_double_custom_far:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.damage_inc
end

function modifier_arc_warden_tempest_double_custom_far:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_arc_warden_tempest_double_custom_far:GetModifierIncomingDamage_Percentage()
	return self.damage
end

modifier_arc_warden_tempest_double_custom_tracker = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_tracker:RemoveOnDeath()
	return false
end
function modifier_arc_warden_tempest_double_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.far_distance = self.ability:GetSpecialValueFor("far_distance")
	self.ability.damage_reduce = self.ability:GetSpecialValueFor("damage_reduce")
	self.ability.health_loss = self.ability:GetSpecialValueFor("health_loss")
	self.ability.damage_inc = self.ability:GetSpecialValueFor("damage_inc")
	self.ability.scepter_move = self.ability:GetSpecialValueFor("scepter_move")
	self.ability.scepter_damage_reduce = self.ability:GetSpecialValueFor("scepter_damage_reduce")

	self.interval = 0.1
	self.count = 0
	self.max = 5

	self.legendary_ability = self.parent:FindAbilityByName("arc_warden_tempest_double_custom_legendary")
	if self.legendary_ability then
		self.legendary_ability:UpdateTalents()
	end

	self.records = {}

	if not IsServer() then
		return
	end

	self.parent:AddSpellEvent(self, true)
	self.parent:AddOrderFilter(self)
	self.tempest_ability = self.parent:FindAbilityByName(self.ability:GetName())

	self.tempest_init = false
	if self.parent:IsTempestDouble() then
		self.interval = 0.5
	end

	self:StartIntervalThink(self.interval)
end

function modifier_arc_warden_tempest_double_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")

	if not IsServer() then
		return
	end
	self.tempest_init = false
end

function modifier_arc_warden_tempest_double_custom_tracker:OrderFilter(params)
	if params.order_type ~= DOTA_UNIT_ORDER_CAST_TARGET then
		return
	end
	if not params.ability then
		return
	end
	if params.ability:GetName() ~= "item_cyclone_custom" and params.ability:GetName() ~= "item_wind_waker_custom" then
		return
	end
	if not params.target then
		return
	end

	local is_pair = (self.parent.owner == params.target and self.parent:IsTempestDouble())
		or (params.target.owner == self.parent and params.target:IsTempestDouble())
	if not is_pair then
		return
	end

	CustomGameEventManager:Send_ServerToPlayer(
		params.player,
		"CreateIngameErrorMessage",
		{ message = "#cyclone_error" }
	)
	return false
end

function modifier_arc_warden_tempest_double_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_arc_warden_tempest_double_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	local tempest = self.parent.tempest_double_tempest

	if not self.parent:IsTempestDouble() then
		if tempest and not self.tempest_init then
			self.tempest_init = true
			CustomGameEventManager:Send_ServerToPlayer(
				PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
				"update_tempest_entindex_js",
				{ entindex = tempest:entindex() }
			)
		end
		if self.ability.talents.has_h6 == 1 then
			if
				IsValid(tempest)
				and tempest:IsAlive()
				and self.parent:GetHealthPercent() <= self.ability.talents.h6_health
				and (tempest:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D()
					<= self.ability.talents.h6_radius
			then
				if not self.parent:HasModifier("modifier_arc_warden_tempest_double_custom_lowhp") then
					self.parent:AddNewModifier(
						self.parent,
						self.ability,
						"modifier_arc_warden_tempest_double_custom_lowhp",
						{ target = tempest:entindex() }
					)
				end
			else
				if self.parent:HasModifier("modifier_arc_warden_tempest_double_custom_lowhp") then
					self.parent:RemoveModifierByName("modifier_arc_warden_tempest_double_custom_lowhp")
				end
			end
		end
		if self.parent:HasScepter() then
			if not IsValid(tempest) or not tempest:IsAlive() then
				self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_arc_warden_tempest_double_custom_scepter",
					{}
				)
			elseif self.parent:HasModifier("modifier_arc_warden_tempest_double_custom_scepter") then
				self.parent:RemoveModifierByName("modifier_arc_warden_tempest_double_custom_scepter")
			end
		end

		if self.ability.talents.has_r3 == 1 and not self.parent:HasCd("arc_r3", self.ability.talents.r3_cd) then
			local attacker = (IsValid(tempest) and tempest:IsAlive()) and tempest or self.parent
			local ability = attacker:FindAbilityByName(self.ability:GetName())

			if
				not attacker:IsInvisible()
				and attacker:IsAlive()
				and not attacker:HasModifier("modifier_arc_warden_tempest_double_custom_far")
				and ability
			then
				local target = self.parent:RandomTarget(
					self.ability.talents.r3_range + attacker:Script_GetAttackRange(),
					attacker:GetAbsOrigin()
				)
				if target then
					ProjectileManager:CreateTrackingProjectile({
						EffectName = "particles/arc_warden/tempest_attack.vpcf",
						Ability = ability,
						Source = attacker,
						vSourceLoc = attacker:GetAbsOrigin(),
						Target = target,
						iMoveSpeed = attacker:GetProjectileSpeed(),
						bDodgeable = false,
						bVisibleToEnemies = true,
					})
					attacker:EmitSound("Arc.Tempest_attack")
					self.parent:StartCd("arc_r3", self.ability.talents.r3_cd)
				end
			end
		end
	end

	self.count = self.count + self.interval

	if self.count < self.max then
		return
	end
	self.count = 0

	if not IsValid(tempest) then
		return
	end
	self.ability:ManageBuffs(tempest)
end

function modifier_arc_warden_tempest_double_custom_tracker:GetCritChance()
	if self.ability.talents.has_r1 == 0 then
		return 0
	end
	if not self.parent:HasModifier("modifier_arc_warden_tempest_double_custom") then
		return 0
	end
	return self.ability.talents.r1_chance
end

function modifier_arc_warden_tempest_double_custom_tracker:GetCritDamage()
	if self.ability.talents.has_r1 == 0 then
		return
	end
	if not self.parent:HasModifier("modifier_arc_warden_tempest_double_custom") then
		return
	end
	return self.ability.talents.r1_crit
end

function modifier_arc_warden_tempest_double_custom_tracker:GetModifierStatusResistanceStacking()
	if not self.parent:HasModifier("modifier_arc_warden_tempest_double_custom") then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_status
end

function modifier_arc_warden_tempest_double_custom_tracker:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_magic
end

function modifier_arc_warden_tempest_double_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	local unit = params.unit

	if unit ~= self.parent then
		return
	end

	local tempest = self.parent:GetTempest()

	if
		not self.parent:HasModifier("modifier_arc_warden_tempest_double_custom")
		and self.ability.talents.has_r3 == 1
		and self.parent:HasCd("arc_r3", self.ability.talents.r3_cd)
	then
		self.parent:RemoveCd("arc_r3")
		self:OnIntervalThink()
	end

	if not self.ability.cd_items[params.ability:GetName()] then
		return
	end
	if not IsValid(tempest) then
		return
	end

	local item = tempest:FindItemInInventory(params.ability:GetName())

	if not item then
		return
	end
	item:UseResources(false, false, false, true)
end

function modifier_arc_warden_tempest_double_custom_tracker:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	if not self.parent:HasModifier("modifier_arc_warden_tempest_double_custom") then
		return
	end
	if self.ability.talents.has_r1 == 0 then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	if not RollPseudoRandomPercentage(self:GetCritChance(), 830, self.parent) then
		return
	end

	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_arc_warden_tempest_double_custom_tracker:RecordDestroyEvent(params)
	if not self.records[params.record] then
		return
	end
	self.records[params.record] = nil
end

function modifier_arc_warden_tempest_double_custom_tracker:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r4 == 0 then
		return
	end
	if not self.parent:HasModifier("modifier_arc_warden_tempest_double_custom") then
		return
	end
	local attacker = params.attacker

	if attacker:IsCreep() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if attacker:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if self.parent:HasModifier("modifier_arc_warden_tempest_double_custom_bkb_cd") then
		return
	end
	if params.original_damage < self.ability.talents.r4_damage then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_arc_warden_tempest_double_custom_bkb_cd",
		{ duration = self.ability.talents.r4_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_generic_debuff_immune",
		{ effect = 2, duration = self.ability.talents.r4_duration }
	)
	self.parent:EmitSound("Arc.Tempest_bkb")

	Timers:CreateTimer(0.1, function()
		if IsValid(self.parent) then
			self.parent:Purge(false, true, false, true, true)
		end
	end)

	return 0
end

function modifier_arc_warden_tempest_double_custom_tracker:GetModifierIncomingDamage_Percentage(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h6 == 0 then
		return
	end

	local tempest = self.parent.tempest_double_tempest
	if not IsValid(tempest) then
		return
	end
	if not tempest:IsAlive() then
		return
	end
	if (tempest:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.ability.talents.h6_radius then
		return
	end
	if params.original_damage <= 0 then
		return
	end

	local reduce = self.ability.talents.h6_damage_reduce
		* (self.parent:GetHealthPercent() <= self.ability.talents.h6_health and self.ability.talents.h6_bonus or 1)
	local damage = (params.damage * reduce * -1) / 100
	DoDamage({
		damage = damage,
		victim = tempest,
		attacker = params.attacker,
		ability = params.inflictor,
		damage_type = DAMAGE_TYPE_PURE,
		damage_flags = DOTA_DAMAGE_FLAG_HPLOSS + DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
		custom_flag = "ignore_flag",
	})
	return reduce
end

modifier_arc_warden_tempest_double_custom_lowhp = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_lowhp:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.target = EntIndexToHScript(table.target)

	self.parent:EmitSound("Arc.Tempest_reduce")
	self.parent:GenericParticle("particles/arc_warden/tempest_reduce.vpcf", self)

	self.particle = ParticleManager:CreateParticle(
		"particles/arc_warden/tempest_tether.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		1,
		self.target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.target:GetOrigin(),
		true
	)
	self:AddParticle(self.particle, false, false, -1, false, false)
end

modifier_arc_warden_tempest_double_custom_items = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_items:RemoveOnDeath()
	return false
end
function modifier_arc_warden_tempest_double_custom_items:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self:StartIntervalThink(0.1)
end

function modifier_arc_warden_tempest_double_custom_items:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:IsChanneling() then
		return
	end

	self.ability:ManageItems(self.parent)
	self:Destroy()
end

modifier_arc_warden_tempest_double_custom_bkb_cd = class(mod_cd)
function modifier_arc_warden_tempest_double_custom_bkb_cd:GetTexture()
	return "buffs/arc_warden/double_4"
end

modifier_arc_warden_tempest_double_custom_auto_damage = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_auto_damage:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.r3_damage - 100
end

function modifier_arc_warden_tempest_double_custom_auto_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_arc_warden_tempest_double_custom_auto_damage:GetModifierTotalDamageOutgoing_Percentage()
	return self.damage
end

modifier_arc_warden_tempest_double_custom_scepter = class(mod_visible)
function modifier_arc_warden_tempest_double_custom_scepter:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage_reduce = self.ability.scepter_damage_reduce
	self.move = self.ability.scepter_move
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/arc_warden/scepter_shields.vpcf", self)
end

function modifier_arc_warden_tempest_double_custom_scepter:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_arc_warden_tempest_double_custom_scepter:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_arc_warden_tempest_double_custom_scepter:GetModifierIncomingDamage_Percentage()
	return self.damage_reduce
end

arc_warden_tempest_double_custom_legendary = class({})
arc_warden_tempest_double_custom_legendary.talents = {}

function arc_warden_tempest_double_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

function arc_warden_tempest_double_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r7 = 0,
			r7_cast = caster:GetTalentValue("modifier_arc_warden_double_7", "cast", true),
			r7_talent_cd = caster:GetTalentValue("modifier_arc_warden_double_7", "talent_cd", true),
			r7_duration = caster:GetTalentValue("modifier_arc_warden_double_7", "duration", true),
			r7_damage_reduce = caster:GetTalentValue("modifier_arc_warden_double_7", "damage_reduce", true),
			r7_range = caster:GetTalentValue("modifier_arc_warden_double_7", "range", true),
			r7_damage = caster:GetTalentValue("modifier_arc_warden_double_7", "damage", true),
			r7_health = caster:GetTalentValue("modifier_arc_warden_double_7", "health", true),
		}
	end

	if caster:HasTalent("modifier_arc_warden_double_7") then
		self.talents.has_r7 = 1
		if IsServer() and not self:IsTrained() then
			self:SetLevel(1)
		end
	end
end

function arc_warden_tempest_double_custom_legendary:GetCooldown()
	return self.talents.has_r7 == 1 and self.talents.r7_talent_cd or 0
end

function arc_warden_tempest_double_custom_legendary:OnSpellStart()
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_arc_warden_tempest_double_custom_legendary_caster",
		{ duration = self.talents.r7_cast + 0.1 }
	)
end

modifier_arc_warden_tempest_double_custom_legendary_caster = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_legendary_caster:GetStatusEffectName()
	return "particles/units/heroes/hero_kez/status_effect_kez_shield.vpcf"
end
function modifier_arc_warden_tempest_double_custom_legendary_caster:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_arc_warden_tempest_double_custom_legendary_caster:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.damage_reduce = self.ability.talents.r7_damage_reduce

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Arc.Teleport_cast")
	self.parent:GenericParticle("particles/arc_warden/legendary_tp_tube_tempest.vpcf", self)
	self.parent:EmitSound("Arc.Teleport_loop")

	self.tempest = self.parent:GetTempest()
	if IsValid(self.tempest) then
		self.tempest:RemoveModifierByName("modifier_arc_warden_tempest_double_custom_legendary")
	end

	self.parent:AddOrderEvent(self)

	self.ability:EndCd()

	self.parent:GenericParticle("particles/arc_warden/double_legendary_shields.vpcf", self)
	self:OnIntervalThink()
	self:StartIntervalThink(0.2)
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:OnIntervalThink()
	if not IsServer() then
		return
	end

	if IsValid(self.tempest) and self.tempest:IsAlive() then
		self.tempest:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_arc_warden_tempest_double_custom_legendary",
			{ duration = self.ability.talents.r7_duration }
		)
	end
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:StopSound("Arc.Teleport_loop")

	self.parent:GenericParticle("particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf")

	self.parent:EmitSound("Arc.Legendary_end")
	if IsValid(self.tempest) and self.tempest:IsAlive() then
		self.tempest:GenericParticle("particles/arc_warden/legendary_tp_end.vpcf")
		self.tempest:GenericParticle("particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf")
		self.tempest:GenericParticle("particles/enigma/summon_perma.vpcf")

		self.tempest:EmitSound("Arc.Teleport_start")
		self.tempest:EmitSound("Arc.Legendary_end_tempest")
	end
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:OrderEvent(params)
	if params.order_type == DOTA_UNIT_ORDER_STOP or params.order_type == DOTA_UNIT_ORDER_HOLD_POSITION then
		self:Destroy()
	end
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:GetModifierIncomingDamage_Percentage()
	return self.damage_reduce
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:GetModifierIgnoreCastAngle()
	return 1
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:GetModifierDisableTurning()
	return 1
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:GetOverrideAnimation()
	return ACT_DOTA_TELEPORT
end

function modifier_arc_warden_tempest_double_custom_legendary_caster:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_DISARMED] = true,
	}
end

modifier_arc_warden_tempest_double_custom_legendary = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_legendary:GetEffectName()
	return "particles/generic_gameplay/rune_doubledamage_owner.vpcf"
end
function modifier_arc_warden_tempest_double_custom_legendary:GetPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_arc_warden_tempest_double_custom_legendary:OnCreated(table)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.range = self.ability.talents.r7_range
	self.cast = self.ability.talents.r7_cast

	self.interval = 0.1
	self.max = self.cast / self.interval

	self.damage = self.ability.talents.r7_damage / self.max
	self.health = self.ability.talents.r7_health / self.max
	self.size = 30 / self.max

	self.duration = self.ability.talents.r7_duration

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Arc.Buff_loop")
	self.parent:GenericParticle("particles/razor/link_purge.vpcf", self)

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_arc_warden_tempest_double_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	local max_time = self.duration
	local time = self:GetRemainingTime()
	local stack = math.floor(self.damage * self:GetStackCount())
	local active = 1
	local in_range = (self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= self.range

	local mod = self.caster:FindModifierByName("modifier_arc_warden_tempest_double_custom_legendary_caster")
	if mod then
		active = 0
		max_time = self.cast
		time = mod:GetElapsedTime()

		if in_range then
			if self:GetStackCount() < self.max then
				local health_percent = self.parent:GetHealthPercent() / 100

				self:IncrementStackCount()
				self.parent:CalculateStatBonus(true)
				self.parent:SetHealth(
					math.max(1, math.min(self.parent:GetMaxHealth(), self.parent:GetMaxHealth() * health_percent))
				)
			end

			local cast_particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_arc_warden/arc_warden_flux_cast.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				cast_particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControl(
				cast_particle,
				1,
				self.parent:GetAbsOrigin() + RandomVector(RandomInt(50, 250))
			)
			ParticleManager:SetParticleControlEnt(
				cast_particle,
				2,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(cast_particle)

			if not self.particle then
				self.parent:EmitSound("Arc.Teleport_loop2")
				self.particle = ParticleManager:CreateParticle(
					"particles/arc_warden/tempest_eam.vpcf",
					PATTACH_POINT_FOLLOW,
					self.parent
				)
				ParticleManager:SetParticleControlEnt(
					self.particle,
					0,
					self.parent,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.parent:GetAbsOrigin(),
					true
				)
				ParticleManager:SetParticleControl(self.particle, 1, self.caster:GetAbsOrigin() + Vector(0, 0, 125))
				self:AddParticle(self.particle, false, false, -1, false, false)
			end
		end
	end

	if (not mod or not in_range) and self.particle then
		self.parent:StopSound("Arc.Teleport_loop2")
		ParticleManager:DestroyParticle(self.particle, false)
		ParticleManager:ReleaseParticleIndex(self.particle)
		self.particle = nil
	end

	self.caster:UpdateUIshort({
		max_time = max_time,
		time = time,
		stack = stack .. "%",
		active = active,
		priority = 2,
		style = "ArcTempest",
	})
end

function modifier_arc_warden_tempest_double_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	self.caster:UpdateUIshort({ hide = 1, priority = 2, style = "ArcTempest" })
	self.parent:StopSound("Arc.Buff_loop")
	self.parent:StopSound("Arc.Teleport_loop2")
	self.parent:CalculateStatBonus(true)
end

function modifier_arc_warden_tempest_double_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
		MODIFIER_PROPERTY_PROJECTILE_NAME,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_arc_warden_tempest_double_custom_legendary:GetModifierExtraHealthPercentage()
	return self.health * self:GetStackCount()
end

function modifier_arc_warden_tempest_double_custom_legendary:GetModifierDamageOutgoing_Percentage()
	return self.damage * self:GetStackCount()
end

function modifier_arc_warden_tempest_double_custom_legendary:GetModifierModelScale()
	return self.size * self:GetStackCount()
end

function modifier_arc_warden_tempest_double_custom_legendary:GetModifierProjectileName()
	return "particles/arc_warden/field_attack.vpcf"
end

arc_warden_tempest_double_custom_reunion = class({})
function arc_warden_tempest_double_custom_reunion:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.channel_time = self:GetLevelSpecialValueFor("channel_time", 1)
end

function arc_warden_tempest_double_custom_reunion:GetChannelTime()
	return self.channel_time or 0
end

function arc_warden_tempest_double_custom_reunion:OnAbilityPhaseStart()
	return self.caster:CanTeleport()
end

function arc_warden_tempest_double_custom_reunion:OnSpellStart()
	local tempest = self.caster:GetTempest()
	if tempest then
		local ability = tempest:FindAbilityByName(self:GetName())
		if ability then
			ability:StartCd()
		end
	end

	self.caster:AddNewModifier(self.caster, self, "modifier_arc_warden_tempest_double_custom_scepter_tp", {})
end

function arc_warden_tempest_double_custom_reunion:OnChannelFinish(bInterrupted)
	self.caster:RemoveModifierByName("modifier_arc_warden_tempest_double_custom_scepter_tp")

	local target = self.caster:GetTempest()
	if bInterrupted then
		return
	end
	if not IsValid(target) or not target:IsAlive() then
		return
	end

	local point = target:GetAbsOrigin()

	EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Arc.Teleport_start", self.caster)
	EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Arc.Teleport_start2", self.caster)
	EmitSoundOnLocationWithCaster(point, "Arc.Teleport_end", self.caster)

	local particle =
		ParticleManager:CreateParticle("particles/arc_warden/legendary_tp_start.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf",
		PATTACH_WORLDORIGIN,
		self.caster
	)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_arc_warden_tempest_double_custom_scepter_tp_invun",
		{ duration = 0.2, x = point.x, y = point.y }
	)

	particle = ParticleManager:CreateParticle("particles/arc_warden/legendary_tp_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, point)
	ParticleManager:ReleaseParticleIndex(particle)
end

function arc_warden_tempest_double_custom_reunion:OnChannelThink(fInterval)
	if not self.caster:TeleportThink() then
		self.caster:Stop()
		self.caster:Interrupt()
	end
end

modifier_arc_warden_tempest_double_custom_scepter_tp = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_scepter_tp:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:EmitSound("Arc.Teleport_cast")
	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_VICTORY, 1.9)

	local effect = self.parent:IsTempestDouble() and "particles/arc_warden/legendary_tp_tube_tempest.vpcf"
		or "particles/arc_warden/legendary_tp_tube.vpcf"
	self.parent:GenericParticle(effect, self)
	self.parent:EmitSound("Arc.Teleport_loop")
end

function modifier_arc_warden_tempest_double_custom_scepter_tp:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Arc.Teleport_loop")
	self.parent:FadeGesture(ACT_DOTA_VICTORY)
end

function modifier_arc_warden_tempest_double_custom_scepter_tp:CheckState()
	return {
		[MODIFIER_STATE_IGNORING_MOVE_AND_ATTACK_ORDERS] = true,
	}
end

modifier_arc_warden_tempest_double_custom_scepter_tp_invun = class(mod_hidden)
function modifier_arc_warden_tempest_double_custom_scepter_tp_invun:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.parent:NoDraw(self)
	self.parent:AddNoDraw()

	self.parent:InterruptMotionControllers(false)

	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self:StartIntervalThink(0.1)
end

function modifier_arc_warden_tempest_double_custom_scepter_tp_invun:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent or self.parent:IsNull() then
		return
	end

	FindClearSpaceForUnit(self.parent, self.point, false)
	self:StartIntervalThink(-1)
end

function modifier_arc_warden_tempest_double_custom_scepter_tp_invun:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveNoDraw()

	self.parent:Stop()
	self.parent:EmitSound("Arc.Teleport_end2")
	self.parent:StartGesture(ACT_DOTA_TELEPORT_END)

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_arc_warden/arc_warden_tempest_cast.vpcf",
		PATTACH_WORLDORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)
end

function modifier_arc_warden_tempest_double_custom_scepter_tp_invun:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
	}
end