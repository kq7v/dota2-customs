--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_dummy_high_five_custom", "abilities/ui/high_five_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_high_five_search", "abilities/ui/high_five_custom", LUA_MODIFIER_MOTION_NONE)

high_five_custom = class({})

function high_five_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	context:AddResource("soundevents/game_sounds.vsndevts")
end

function high_five_custom:IsHiddenAbilityCastable()
	return true
end
function high_five_custom:IsStealable()
	return false
end

function high_five_custom:OnSpellStart()
	local caster = self:GetCaster()

	local table_data = CustomNetTables:GetTableValue("sub_data", tostring(caster:GetPlayerOwnerID()))

	self:EndCd(0)

	if not caster.is_bot and (not table_data or not table_data.subscribed or table_data.subscribed == 0) then
		return
	end
	if not caster:IsAlive() then
		return
	end
	if caster:HasModifier("modifier_high_five_search") then
		return
	end

	self:StartCooldown(60)

	caster:AddNewModifier(
		caster,
		self,
		"modifier_high_five_search",
		{ duration = self:GetSpecialValueFor("request_duration") }
	)

	caster:EmitSound("high_five.cast")
end

function high_five_custom:OnProjectileHit_ExtraData(hTarget, vLocation, table)
	local caster = self:GetCaster()

	if self.dummy and not self.dummy:IsNull() then
		local abs = self.dummy:GetAbsOrigin()

		if table.main and table.main == 1 then
			local particle = ParticleManager:CreateParticle(table.impact, PATTACH_WORLDORIGIN, nil)
			ParticleManager:SetParticleControl(particle, 0, abs)
			ParticleManager:SetParticleControl(particle, 3, abs)
			ParticleManager:ReleaseParticleIndex(particle)

			EmitSoundOnLocationWithCaster(abs, "high_five.impact", self:GetCaster())

			UTIL_Remove(self.dummy)
			self.dummy = nil
		end
	end
end

modifier_high_five_search = class({})
function modifier_high_five_search:IsHidden()
	return true
end
function modifier_high_five_search:IsPurgable()
	return false
end

function modifier_high_five_search:OnCreated(params)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.finded = false
	self.find_radius = self.ability:GetSpecialValueFor("acknowledge_range")
	self.speed = self.ability:GetSpecialValueFor("high_five_speed")
	self.cd = self.ability:GetSpecialValueFor("acknowledged_cooldown")

	self:StartIntervalThink(self.ability:GetSpecialValueFor("think_interval"))
	if not IsServer() then
		return
	end
	self.selected_id = 0
	local get_player_data = CustomNetTables:GetTableValue("sub_data", tostring(self.parent:GetPlayerOwnerID()))
	if
		get_player_data
		and get_player_data.selected_high_five ~= nil
		and shop:HasSelectItem(self.parent:GetPlayerOwnerID(), high_five_item_list, get_player_data.selected_high_five)
	then
		self.selected_id = get_player_data.selected_high_five
	end

	local effect_high_five = shop:GetHighFiveData(self.selected_id)
	self.overhead_effect = effect_high_five[3]
	self.travel_effect = effect_high_five[2]
	self.impact_effect = effect_high_five[1]

	if self.selected_id == 10 then
		self.parent:EmitSound("HighFive.Midas_cast")
	end

	local high_five_overhead =
		ParticleManager:CreateParticle(self.overhead_effect, PATTACH_OVERHEAD_FOLLOW, self:GetParent())
	self:AddParticle(high_five_overhead, false, false, -1, false, true)
end

function modifier_high_five_search:OnDestroy()
	if self.finded == true then
		if self.selected_id == 10 then
			self.parent:GiveGold(RandomInt(1, 3), true, nil, self.ability)
		end
	end

	if not IsServer() or self.finded then
		return
	end

	local towers = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.find_radius,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_BUILDING,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE
			+ DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
			+ DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
			+ DOTA_UNIT_TARGET_FLAG_NO_INVIS,
		FIND_CLOSEST,
		false
	)

	for _, tower in pairs(towers) do
		self:EndTarget(tower)
		return
	end

	self.parent:EmitSound("high_five.fail")
end

function modifier_high_five_search:OnIntervalThink()
	if not IsServer() then
		return
	end

	local units = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.find_radius,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE
			+ DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD
			+ DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES
			+ DOTA_UNIT_TARGET_FLAG_NO_INVIS,
		FIND_CLOSEST,
		false
	)

	for _, unit in pairs(units) do
		if unit:HasModifier(self:GetName()) and unit ~= self.parent then
			self:EndTarget(unit)
			self:Destroy()
			return
		end
	end
end

function modifier_high_five_search:EndTarget(unit)
	if not IsServer() then
		return
	end

	local unit_ability = unit:FindAbilityByName("high_five_custom")
	local unit_modifier = unit:FindModifierByName("modifier_high_five_search")

	local unit_origin = unit:GetAbsOrigin()

	local parent_origin = self.parent:GetAbsOrigin()
	local vec = (unit_origin - parent_origin)
	local length = vec:Length2D()
	local dir = vec:Normalized()

	local center = parent_origin + dir * (length / 2)
	local dummy = self:CreateDummy(center)

	self.ability.dummy = dummy

	local vel = (center - parent_origin):Normalized()
	vel.z = 0

	local travel_effect = self.travel_effect
	local impact_effect = self.impact_effect

	local info = {
		Source = self.parent,
		Ability = self.ability,
		vSpawnOrigin = parent_origin,
		EffectName = travel_effect,
		fStartRadius = 10,
		fEndRadius = 10,
		fDistance = length / 2,
		vVelocity = vel * self.speed,
		ExtraData = { main = 1, impact = impact_effect },
	}
	ProjectileManager:CreateLinearProjectile(info)

	local new_vel = (center - unit_origin):Normalized()
	new_vel.z = 0

	if unit_modifier then
		travel_effect = unit_modifier.travel_effect
		impact_effect = unit_modifier.impact_effect
	end

	info.Source = unit
	info.EffectName = travel_effect
	info.vSpawnOrigin = unit_origin
	info.vVelocity = new_vel * self.speed
	info.ExtraData = { main = 0, impact = impact_effect }

	ProjectileManager:CreateLinearProjectile(info)

	self:EndSearch()

	if unit_modifier then
		unit_modifier:EndSearch()
	end
end

function modifier_high_five_search:EndSearch()
	if not IsServer() then
		return
	end

	self.finded = true

	self.ability:EndCd(0)
	self.ability:StartCooldown(self.cd)

	self:Destroy()
end

function modifier_high_five_search:CreateDummy(origin)
	if not IsServer() then
		return
	end

	local dummy = CreateUnitByName("npc_dummy_unit", origin, false, nil, nil, DOTA_TEAM_NEUTRALS)
	dummy:AddNewModifier(dummy, nil, "modifier_dummy_high_five_custom", {})
	dummy:AddNewModifier(dummy, nil, "modifier_phased", {})

	return dummy
end

modifier_dummy_high_five_custom = class({})

function modifier_dummy_high_five_custom:IsHidden()
	return true
end
function modifier_dummy_high_five_custom:IsPurgable()
	return false
end
function modifier_dummy_high_five_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end

function modifier_dummy_high_five_custom:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
	}
end

function modifier_dummy_high_five_custom:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	--self.parent:AddNoDraw()
end