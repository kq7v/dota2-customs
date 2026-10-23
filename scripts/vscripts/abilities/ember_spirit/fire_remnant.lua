--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_ember_spirit_fire_remnant_custom_remnant",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_fire_remnant_custom_unit",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_fire_remnant_custom_timer",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_fire_remnant_custom_timer_count",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_fire_remnant_custom_tracker",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE,
	false
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_caster",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_BOTH
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_thinker",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_heal_count",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_hero_3"
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_amp",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_remnant_3"
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_legendary",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_legendary_timer",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_burn",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_auto_cd",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_remnant_4"
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_slow",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_silence",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ember_hero_4"
)
LinkLuaModifier(
	"modifier_ember_spirit_activate_fire_remnant_custom_silence_cd",
	"abilities/ember_spirit/fire_remnant",
	LUA_MODIFIER_MOTION_NONE
)

fire_remnant_class = class({})
function fire_remnant_class:GetCastRange(vLocation, target)
	return self.BaseClass.GetCastRange(self, vLocation, target)
		+ (self.talents.has_r4 == 1 and self.talents.r4_range or 0)
end

function fire_remnant_class:GetAbilityChargeRestoreTime(level)
	return (self.cd or 0) + (self.talents.r2_cd or 0)
end

ember_spirit_fire_remnant_custom = class(fire_remnant_class)
ember_spirit_fire_remnant_custom.talents = {}

function ember_spirit_fire_remnant_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/broodmother_web.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_ember_spirit/ember_spirit_fire_remnant_trail.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_ember_spirit/ember_spirit_fire_remnant.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ember_spirit/ember_spirit_hit.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/remnant_fire.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ember_spirit/ember_spirit_remnant_dash.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/legendary_aoe.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_phoenix/phoenix_icarus_dive_burn_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_burn.vpcf", context)
	PrecacheResource("particle", "particles/shadow_fiend/sf_refresh_a.vpcf", context)
	PrecacheResource("particle", "particles/ember_spirit/attack_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/ember_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", context)
	PrecacheResource("model", "models/ember_spirit_fx.vmdl", context)
end

function ember_spirit_fire_remnant_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r2_cd = 0,

			has_h3 = 0,
			h3_health = 0,
			h3_mana = 0,
			h3_duration = caster:GetTalentValue("modifier_ember_hero_3", "duration", true),

			has_r3 = 0,
			r3_spell = 0,
			r3_max = caster:GetTalentValue("modifier_ember_remnant_3", "max", true),
			r3_duration = caster:GetTalentValue("modifier_ember_remnant_3", "duration", true),

			has_r4 = 0,
			r4_range = caster:GetTalentValue("modifier_ember_remnant_4", "range", true),
			r4_cdr = caster:GetTalentValue("modifier_ember_remnant_4", "cdr", true),

			has_r7 = 0,
			r7_cd_inc = caster:GetTalentValue("modifier_ember_remnant_7", "cd_inc", true) / 100,
		}
	end

	if caster:HasTalent("modifier_ember_remnant_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_ember_remnant_2", "cd")
	end

	if caster:HasTalent("modifier_ember_hero_3") then
		self.talents.has_h3 = 1
		self.talents.h3_health = caster:GetTalentValue("modifier_ember_hero_3", "health")
		self.talents.h3_mana = caster:GetTalentValue("modifier_ember_hero_3", "mana")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_ember_remnant_3") then
		self.talents.has_r3 = 1
		self.talents.r3_spell = caster:GetTalentValue("modifier_ember_remnant_3", "spell")
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_ember_remnant_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_ember_remnant_7") then
		self.talents.has_r7 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if self.tracker and self.tracker.scepter_ability then
		self.tracker.scepter_ability:UpdateTalents()
	end
end

function ember_spirit_fire_remnant_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_ember_spirit_fire_remnant_custom_tracker"
end

function ember_spirit_fire_remnant_custom:OnSpellStart()
	self:Cast()
end

function ember_spirit_fire_remnant_custom:OnInventoryContentsChanged()
	if not IsServer() then
		return
	end
	local scepter_ability = self.caster:FindAbilityByName("ember_spirit_fire_remnant_custom_scepter_ability")
	if not scepter_ability then
		return
	end

	if self.caster:HasScepter() and not self:IsHidden() then
		self.caster:SwapAbilities(
			"ember_spirit_fire_remnant_custom",
			"ember_spirit_fire_remnant_custom_scepter_ability",
			false,
			true
		)
		if self.scepter_init then
			scepter_ability:SetCurrentAbilityCharges(0)
		end
		self.scepter_init = true
	end

	if not self.caster:HasScepter() and self:IsHidden() then
		self.caster:SwapAbilities(
			"ember_spirit_fire_remnant_custom",
			"ember_spirit_fire_remnant_custom_scepter_ability",
			true,
			false
		)
		self:SetCurrentAbilityCharges(0)
	end
end

function ember_spirit_fire_remnant_custom:OnProjectileThink_ExtraData(vLocation, ExtraData)
	local thinker = EntIndexToHScript(ExtraData.thinker_index)
	if not IsValid(thinker) then
		return
	end
	if not thinker:IsAlive() then
		return
	end

	thinker:SetAbsOrigin(vLocation)
end

function ember_spirit_fire_remnant_custom:OnProjectileHit_ExtraData(target, vLocation, ExtraData)
	local thinker = EntIndexToHScript(ExtraData.thinker_index)
	if not IsValid(thinker) then
		return
	end
	if not thinker:IsAlive() then
		return
	end

	local mod = thinker:FindModifierByName("modifier_ember_spirit_fire_remnant_custom_remnant")
	if not mod then
		return
	end

	local radius = self.radius
	local tSequences = { 23, 24 }

	vLocation = GetGroundPosition(vLocation, nil)

	local iParticleID = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_fire_remnant.vpcf",
		PATTACH_CUSTOMORIGIN,
		thinker
	)
	ParticleManager:SetParticleControl(iParticleID, 0, vLocation)
	ParticleManager:SetParticleFoWProperties(iParticleID, 0, -1, radius)
	ParticleManager:SetParticleControlEnt(
		iParticleID,
		1,
		self.caster,
		PATTACH_CUSTOMORIGIN_FOLLOW,
		nil,
		vLocation,
		true
	)
	ParticleManager:SetParticleControl(iParticleID, 2, Vector(tSequences[RandomInt(1, #tSequences)], 0, 0))
	mod:AddParticle(iParticleID, true, false, -1, false, false)

	thinker:EmitSound("Hero_EmberSpirit.FireRemnant.Create")
	mod:ClearEffect()
end

function ember_spirit_fire_remnant_custom:Cast(new_pos)
	if not IsServer() then
		return
	end

	local duration = self.duration
	local speed_multiplier = self.speed_multiplier
	local move_speed = self.caster:GetMoveSpeedModifier(self.caster:GetBaseMoveSpeed(), false)

	local StartPosition = self.caster:GetAbsOrigin()
	local TargetPosition = new_pos and new_pos or self:GetCursorPosition()

	local vDirection = TargetPosition - StartPosition
	vDirection.z = 0
	if vDirection:Length2D() == 0 then
		vDirection = self.caster:GetForwardVector()
	end

	local remnant_unit = CreateUnitByName(
		"npc_dota_ember_spirit_remnant_custom",
		StartPosition,
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)

	remnant_unit:SetDayTimeVisionRange(700)
	remnant_unit:SetNightTimeVisionRange(700)
	remnant_unit:AddNewModifier(self.caster, self, "modifier_ember_spirit_fire_remnant_custom_unit", {})
	remnant_unit:AddNewModifier(self.caster, self, "modifier_ember_spirit_fire_remnant_custom_remnant", {})
	remnant_unit.targets_hit = {}

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_ember_spirit_fire_remnant_custom_timer",
		{ duration = duration, thinker_index = remnant_unit:entindex() }
	)
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_ember_spirit_fire_remnant_custom_timer_count",
		{ duration = duration }
	)

	local remnant_speed = move_speed * speed_multiplier
	if self.caster:HasScepter() and self.tracker and self.tracker.scepter_ability then
		remnant_speed =
			math.max(self.tracker.scepter_ability.speed_min, move_speed * self.tracker.scepter_ability.speed_multiplier)
	end

	local iParticleID = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_fire_remnant_trail.vpcf",
		PATTACH_CUSTOMORIGIN,
		remnant_unit
	)
	ParticleManager:SetParticleControlEnt(
		iParticleID,
		0,
		self.caster,
		PATTACH_CUSTOMORIGIN,
		nil,
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(iParticleID, 0, StartPosition)
	ParticleManager:SetParticleControl(iParticleID, 1, vDirection:Normalized() * remnant_speed)
	ParticleManager:SetParticleShouldCheckFoW(iParticleID, false)

	remnant_unit.iParticleID = iParticleID
	remnant_unit.vVelocity = vDirection:Normalized() * remnant_speed

	local tInfo = {
		Ability = self,
		Source = self.caster,
		vSpawnOrigin = StartPosition,
		vVelocity = remnant_unit.vVelocity,
		fDistance = vDirection:Length2D(),
		ExtraData = {
			thinker_index = remnant_unit:entindex(),
		},
	}
	ProjectileManager:CreateLinearProjectile(tInfo)
	self.caster:EmitSound("Hero_EmberSpirit.FireRemnant.Cast")

	if new_pos then
		remnant_unit:AddNewModifier(
			self.caster,
			self,
			"modifier_ember_spirit_activate_fire_remnant_custom_legendary_timer",
			{ duration = vDirection:Length2D() / remnant_speed }
		)
		return
	end
end

modifier_ember_spirit_fire_remnant_custom_tracker = class(mod_hidden)
function modifier_ember_spirit_fire_remnant_custom_tracker:IsHidden()
	return self.ability.talents.has_r4 == 0
		or self.parent:HasModifier("modifier_ember_spirit_activate_fire_remnant_custom_auto_cd")
end
function modifier_ember_spirit_fire_remnant_custom_tracker:GetTexture()
	return "buffs/ember_spirit/FireRemnant_4"
end
function modifier_ember_spirit_fire_remnant_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self

	self.ability_activate = self.parent:FindAbilityByName("ember_spirit_activate_fire_remnant_custom")
	self.legendary_ability = self.parent:FindAbilityByName("ember_spirit_fire_remnant_burst")
	self.scepter_ability = self.parent:FindAbilityByName("ember_spirit_fire_remnant_custom_scepter_ability")

	self.parent.remnant_ability = self.ability
	self.parent.remnant_scepter_ability = self.scepter_ability
	self.parent.remnant_activate_ability = self.ability_activate

	if self.legendary_ability then
		if IsServer() and not self.legendary_ability:IsTrained() then
			self.legendary_ability:SetLevel(1)
		end
		self.legendary_ability:UpdateTalents()
	end

	self.ability.speed_multiplier = self.ability:GetSpecialValueFor("speed_multiplier") / 100
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.cd = self.ability:GetSpecialValueFor("AbilityChargeRestoreTime")

	if self.scepter_ability then
		if IsServer() and not self.scepter_ability:IsTrained() then
			self.scepter_ability:SetLevel(1)
		end
		self.scepter_ability.cd = self.scepter_ability:GetSpecialValueFor("AbilityChargeRestoreTime")
		self.scepter_ability.speed_multiplier = self.scepter_ability:GetSpecialValueFor("speed_multiplier") / 100
		self.scepter_ability.speed_min = self.scepter_ability:GetSpecialValueFor("speed_min")
	end

	self.ability:UpdateTalents()
	self:OnRefresh()

	if self.ability_activate then
		self.ability_activate:UpdateTalents()
		if IsServer() then
			self.ability_activate:FilterRemnants()
		end
	end
end

function modifier_ember_spirit_fire_remnant_custom_tracker:OnRefresh()
	if not self.ability_activate then
		return
	end

	if IsServer() then
		self.ability_activate:SetLevel(self.ability:GetLevel())
	end
	self.ability_activate.damage = self.ability_activate:GetSpecialValueFor("damage")
	self.ability_activate.speed = self.ability_activate:GetSpecialValueFor("speed")
	self.ability_activate.fast_range = self.ability_activate:GetSpecialValueFor("fast_range")
	self.ability_activate.radius = self.ability_activate:GetSpecialValueFor("radius")

	self.ability_activate.shard_cd = self.ability_activate:GetSpecialValueFor("shard_cd")
	self.ability_activate.shard_range = self.ability_activate:GetSpecialValueFor("shard_range")
	self.ability_activate.shard_speed = self.ability_activate:GetSpecialValueFor("shard_speed")
	self.ability_activate.shard_damage = self.ability_activate:GetSpecialValueFor("shard_damage") / 100
end

function modifier_ember_spirit_fire_remnant_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability == self.legendary_ability then
		return
	end

	if self.ability.talents.has_r3 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_ember_spirit_activate_fire_remnant_custom_amp",
			{ duration = self.ability.talents.r3_duration }
		)
	end

	if params.ability and params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_h3 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_ember_spirit_activate_fire_remnant_custom_heal_count",
			{ duration = self.ability.talents.h3_duration }
		)
	end

	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not self.legendary_ability then
		return
	end

	self.parent:CdAbility(self.legendary_ability, nil, self.ability.talents.r7_cd_inc, "modifier_ember_remnant_7")
end

function modifier_ember_spirit_fire_remnant_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_ember_spirit_fire_remnant_custom_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_cdr
end

modifier_ember_spirit_fire_remnant_custom_timer = class(mod_hidden)
function modifier_ember_spirit_fire_remnant_custom_timer:RemoveOnDeath()
	return false
end
function modifier_ember_spirit_fire_remnant_custom_timer:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_ember_spirit_fire_remnant_custom_timer:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true

	self.thinker = EntIndexToHScript(params.thinker_index)
	if not IsValid(self.thinker) or not self.thinker:IsAlive() then
		self:Destroy()
	end
end

function modifier_ember_spirit_fire_remnant_custom_timer:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.thinker) and self.thinker:IsAlive() then
		self.thinker:RemoveModifierByName("modifier_ember_spirit_fire_remnant_custom_remnant")
	end

	local mod = self.parent:FindModifierByName("modifier_ember_spirit_fire_remnant_custom_timer_count")
	if mod then
		mod:DecrementStackCount()
		if mod:GetStackCount() <= 0 then
			mod:Destroy()
			return
		end
	end
end

modifier_ember_spirit_fire_remnant_custom_timer_count = class(mod_visible)
function modifier_ember_spirit_fire_remnant_custom_timer_count:RemoveOnDeath()
	return false
end
function modifier_ember_spirit_fire_remnant_custom_timer_count:OnCreated()
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_ember_spirit_fire_remnant_custom_timer_count:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
end

modifier_ember_spirit_fire_remnant_custom_remnant = class(mod_hidden)
function modifier_ember_spirit_fire_remnant_custom_remnant:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.ability_activate = self.caster.remnant_activate_ability
	if self.ability_activate then
		table.insert(self.ability_activate.active_remnants, self.parent)
		self.ability_activate:FilterRemnants()
	end
end

function modifier_ember_spirit_fire_remnant_custom_remnant:ClearEffect()
	if not IsServer() then
		return
	end
	if not self.parent.iParticleID then
		return
	end

	ParticleManager:DestroyParticle(self.parent.iParticleID, false)
	ParticleManager:ReleaseParticleIndex(self.parent.iParticleID)
	self.parent.iParticleID = nil
end

function modifier_ember_spirit_fire_remnant_custom_remnant:OnDestroy()
	if not IsServer() then
		return
	end

	self:ClearEffect()

	local iParticleID = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_hit.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(iParticleID, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleFoWProperties(iParticleID, 0, -1, self.ability.radius)
	ParticleManager:ReleaseParticleIndex(iParticleID)

	UTIL_Remove(self.parent)

	if self.ability_activate then
		self.ability_activate:FilterRemnants(self.parent)
	end
end

modifier_ember_spirit_fire_remnant_custom_unit = class(mod_hidden)
function modifier_ember_spirit_fire_remnant_custom_unit:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_FORCED_FLYING_VISION] = true,
	}
end

modifier_ember_spirit_activate_fire_remnant_custom_legendary_timer = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_legendary_timer:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
end

function modifier_ember_spirit_activate_fire_remnant_custom_legendary_timer:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.parent) then
		return
	end
	local mod = self.parent:FindModifierByName("modifier_ember_spirit_fire_remnant_custom_remnant")
	local activate_ability = self.caster.remnant_activate_ability

	if not IsValid(mod) then
		return
	end
	if not IsValid(activate_ability) then
		return
	end

	activate_ability:Explosion(self.parent, "modifier_ember_remnant_7")
end

modifier_ember_spirit_activate_fire_remnant_custom_heal_count = class(mod_visible)
function modifier_ember_spirit_activate_fire_remnant_custom_heal_count:GetTexture()
	return "buffs/ember_spirit/hero_4"
end
function modifier_ember_spirit_activate_fire_remnant_custom_heal_count:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability.talents.h3_duration
	self.health = self.ability.talents.h3_health / self.duration
	self.mana = self.ability.talents.h3_mana / self.duration

	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_ember_spirit_activate_fire_remnant_custom_heal_count:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
	Timers:CreateTimer(self.duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
				return
			end
		end
	end)
end

function modifier_ember_spirit_activate_fire_remnant_custom_heal_count:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
		MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
	}
end

function modifier_ember_spirit_activate_fire_remnant_custom_heal_count:GetModifierConstantHealthRegen()
	return self.health * self:GetStackCount()
end

function modifier_ember_spirit_activate_fire_remnant_custom_heal_count:GetModifierConstantManaRegen()
	return self.mana * self:GetStackCount()
end

modifier_ember_spirit_activate_fire_remnant_custom_amp = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_amp:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.damage = self.ability.talents.r3_spell

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.max_time = self:GetRemainingTime()
	self:OnRefresh()

	self:StartIntervalThink(0.2)
	self:OnIntervalThink()
end

function modifier_ember_spirit_activate_fire_remnant_custom_amp:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_ember_spirit_activate_fire_remnant_custom_amp:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIlong({
		max = self.max_time,
		stack = self:GetRemainingTime(),
		override_stack = self:GetStackCount(),
		style = "EmberRemnant",
	})
end

function modifier_ember_spirit_activate_fire_remnant_custom_amp:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIlong({ max = self.max_time, stack = 0, style = "EmberRemnant" })
end

function modifier_ember_spirit_activate_fire_remnant_custom_amp:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_ember_spirit_activate_fire_remnant_custom_amp:GetModifierSpellAmplify_Percentage()
	return self:GetStackCount() * self.damage
end

ember_spirit_fire_remnant_custom_scepter_ability = class(fire_remnant_class)
ember_spirit_fire_remnant_custom_scepter_ability.talents = {}

function ember_spirit_fire_remnant_custom_scepter_ability:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r2_cd = 0,

			has_r4 = 0,
			r4_range = caster:GetTalentValue("modifier_ember_remnant_4", "range", true),
		}
	end

	if caster:HasTalent("modifier_ember_remnant_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_ember_remnant_2", "cd")
	end

	if caster:HasTalent("modifier_ember_remnant_4") then
		self.talents.has_r4 = 1
	end
end

function ember_spirit_fire_remnant_custom_scepter_ability:OnSpellStart()
	if not IsValid(self.caster.remnant_ability) then
		return
	end
	self.caster.remnant_ability:Cast()
end

ember_spirit_activate_fire_remnant_custom = class({})
ember_spirit_activate_fire_remnant_custom.talents = {}

function ember_spirit_activate_fire_remnant_custom:Init()
	self.active_remnants = {}
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()
	self.ability = self
	self.parent = self:GetCaster()
end

function ember_spirit_activate_fire_remnant_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r2_mana = 0,

			has_r1 = 0,
			r1_duration = caster:GetTalentValue("modifier_ember_remnant_1", "duration", true),
			r1_interval = caster:GetTalentValue("modifier_ember_remnant_1", "interval", true),
			r1_linger = caster:GetTalentValue("modifier_ember_remnant_1", "linger", true),
			r1_radius = caster:GetTalentValue("modifier_ember_remnant_1", "radius", true),
			r1_damage_type = caster:GetTalentValue("modifier_ember_remnant_1", "damage_type", true),
			r1_damage = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_creeps = 0,

			has_r4 = 0,
			r4_talent_cd = caster:GetTalentValue("modifier_ember_remnant_4", "talent_cd", true),

			has_h4 = 0,
			h4_slow = caster:GetTalentValue("modifier_ember_hero_4", "slow", true),
			h4_duration = caster:GetTalentValue("modifier_ember_hero_4", "duration", true),
			h4_silence = caster:GetTalentValue("modifier_ember_hero_4", "silence", true),
			h4_miss = caster:GetTalentValue("modifier_ember_hero_4", "miss", true),
			h4_talent_cd = caster:GetTalentValue("modifier_ember_hero_4", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_ember_remnant_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_ember_remnant_1", "damage")
	end

	if caster:HasTalent("modifier_ember_remnant_2") then
		self.talents.r2_mana = caster:GetTalentValue("modifier_ember_remnant_2", "mana")
	end

	if caster:HasTalent("modifier_ember_remnant_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_ember_remnant_3", "damage") / 100
		self.talents.r3_creeps = caster:GetTalentValue("modifier_ember_remnant_3", "creeps")
	end

	if caster:HasTalent("modifier_ember_remnant_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_ember_hero_4") then
		self.talents.has_h4 = 1
	end
end

function ember_spirit_activate_fire_remnant_custom:GetCastPoint(iLevel)
	if self.caster:HasScepter() then
		return 0
	end
	return self.BaseClass.GetCastPoint(self)
end

function ember_spirit_activate_fire_remnant_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) + (self.talents.r2_mana or 0)
end

function ember_spirit_activate_fire_remnant_custom:OnSpellStart()
	local point = self:GetCursorPosition()

	self:FilterRemnants()
	local is_shard = 0

	if #self.active_remnants <= 0 then
		if not self.caster:HasShard() then
			return
		end
		if point == self.caster:GetAbsOrigin() then
			point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector()
		end

		self.caster:FacePoint(point)
		is_shard = 1

		self:StartFlight()
		self:StartCooldown(self.shard_cd)
	else
		self.selected_remnant = self:FindNewRemnant(point)

		if not IsValid(self.selected_remnant) or not self.selected_remnant:IsAlive() then
			return
		end

		local remnant = self:FindNewRemnant()
		if not IsValid(remnant) or not remnant:IsAlive() then
			return
		end

		self:StartFlight(remnant)
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_ember_spirit_activate_fire_remnant_custom_caster",
		{ is_shard = is_shard }
	)
end

function ember_spirit_activate_fire_remnant_custom:OnInventoryContentsChanged()
	if self.shard_init then
		return
	end
	if not self.caster:HasShard() then
		return
	end
	self.shard_init = true
	self:FilterRemnants()
end

function ember_spirit_activate_fire_remnant_custom:OnProjectileThink_ExtraData(vLocation, data)
	local is_shard = data.is_shard
	local damage_ability = nil
	if is_shard == 1 then
		damage_ability = "shard"
	end

	if IsValid(self.current_remnant) and self.current_remnant:IsAlive() then
		self.vRemnantPosition = self.current_remnant:GetAbsOrigin()
	end

	local vDirection = vLocation - self.vLocation
	vDirection.z = 0

	vLocation = GetGroundPosition(
		self.vLocation
			+ vDirection:Normalized()
				* Clamp(vDirection:Length2D(), 0, (self.vLocation - self.vRemnantPosition):Length2D()),
		self.caster
	)
	GridNav:DestroyTreesAroundPoint(vLocation, 200, false)

	local radius = self.radius

	if IsValid(self.current_remnant) and self.current_remnant.targets_hit then
		local targets_hit = FindUnitsInLine(
			self.caster:GetTeamNumber(),
			self.vLocation,
			vLocation,
			nil,
			radius / 2,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
			0
		)
		for _, target in pairs(targets_hit) do
			if not self.current_remnant.targets_hit[target:entindex()] then
				self.current_remnant.targets_hit[target:entindex()] = target
				self:DealDamage(target, damage_ability)
			end
		end
	end

	self.vLocation = vLocation
end

function ember_spirit_activate_fire_remnant_custom:OnProjectileHit_ExtraData(target, vLocation, data)
	local is_shard = data.is_shard
	local damage_ability = nil
	if is_shard == 1 then
		damage_ability = "shard"
	end

	if IsValid(self.current_remnant) and self.current_remnant:IsAlive() then
		self.vRemnantPosition = self.current_remnant:GetAbsOrigin()
		self:Explosion(self.current_remnant, damage_ability)
	end

	self.vRemnantPosition = GetGroundPosition(self.vRemnantPosition, nil)
	GridNav:DestroyTreesAroundPoint(self.vRemnantPosition, 200, false)

	if self.talents.has_r4 == 1 and is_shard == 0 then
		if not self.caster:HasModifier("modifier_ember_spirit_activate_fire_remnant_custom_auto_cd") then
			local ability = self.caster:HasScepter() and self.caster.remnant_scepter_ability
				or self.caster.remnant_ability
			if ability and ability:GetCurrentAbilityCharges() <= 0 then
				self.caster:AddNewModifier(
					self.caster,
					self,
					"modifier_ember_spirit_activate_fire_remnant_custom_auto_cd",
					{ duration = self.talents.r4_talent_cd }
				)
				ability:AddCharge(1, "particles/shadow_fiend/sf_refresh_a.vpcf", "Ember.Remnant_refresh")
			end
		end
	end

	local remnant

	if is_shard == 0 then
		self:FilterRemnants()
		remnant = self:FindNewRemnant()
	else
		UTIL_Remove(self.current_remnant)
	end

	if not IsValid(remnant) or not remnant:IsAlive() then
		self.caster:RemoveModifierByName("modifier_ember_spirit_activate_fire_remnant_custom_caster")
		FindClearSpaceForUnit(self.caster, self.vRemnantPosition, false)
		self.vLocation = nil
		self.selected_remnant = nil
		return
	end

	self:StartFlight(remnant)
end

function ember_spirit_activate_fire_remnant_custom:FilterRemnants(removed)
	if not IsServer() then
		return
	end

	local mods = self.caster:FindAllModifiersByName("modifier_ember_spirit_fire_remnant_custom_timer")
	for _, mod in pairs(mods) do
		if not IsValid(mod.thinker) or not mod.thinker:IsAlive() or mod.thinker == removed then
			mod:Destroy()
		end
	end

	for i = #self.active_remnants, 1, -1 do
		local remnant = self.active_remnants[i]
		if not IsValid(remnant) or not remnant:IsAlive() or remnant == removed then
			table.remove(self.active_remnants, i)
		end
	end

	self:SetActivated(#self.active_remnants > 0 or self.caster:HasShard())
end

function ember_spirit_activate_fire_remnant_custom:FindNewRemnant(new_point)
	if not IsServer() then
		return
	end

	local new_search = false
	local point = self.caster:GetAbsOrigin()
	if not IsValid(self.selected_remnant) then
		new_search = true
		if new_point then
			point = new_point
		end
	else
		point = self.selected_remnant:GetAbsOrigin()
	end

	local current_id = -1
	local current_dist = new_search and 99999 or -1

	for id, remnant in pairs(self.active_remnants) do
		local dist = (remnant:GetAbsOrigin() - point):Length2D()
		if (new_search and dist < current_dist) or (not new_search and dist > current_dist) then
			current_dist = dist
			current_id = id
		end
	end

	return self.active_remnants[current_id]
end

function ember_spirit_activate_fire_remnant_custom:StartFlight(remnant)
	if not IsServer() then
		return
	end
	self.caster:RemoveModifierByName("modifier_ember_spirit_sleight_of_fist_custom_caster")

	local speed
	local target = remnant
	local is_shard = 0

	if not remnant then
		local point = self.caster:GetAbsOrigin() + self.shard_range * self.caster:GetForwardVector()
		speed = self.shard_speed
		point = GetGroundPosition(point, nil)

		target = CreateUnitByName(
			"npc_dota_ember_spirit_remnant_custom",
			point,
			false,
			self.caster,
			self.caster,
			self.caster:GetTeamNumber()
		)
		target:AddNewModifier(self.caster, self, "modifier_ember_spirit_activate_fire_remnant_custom_thinker", {})
		target:SetAbsOrigin(point)
		target.targets_hit = {}
		is_shard = 1
	else
		local fDistance = (remnant:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D()
		speed = fDistance > self.fast_range and (fDistance / 0.4) or self.speed
	end

	self.current_remnant = target
	self.vRemnantPosition = self.current_remnant:GetAbsOrigin()
	self.vLocation = self.caster:GetAbsOrigin()

	local tInfo = {
		Target = target,
		Source = self.caster,
		Ability = self,
		iMoveSpeed = speed,
		vSourceLoc = self.caster:GetAbsOrigin(),
		flExpireTime = GameRules:GetGameTime() + 10,
		bReplaceExisting = true,
		ExtraData = {
			is_shard = is_shard,
		},
	}
	ProjectileManager:CreateTrackingProjectile(tInfo)
end

function ember_spirit_activate_fire_remnant_custom:DealDamage(target, damage_ability)
	if not IsServer() then
		return
	end
	local damage = self.damage
	local bonus = 0

	if self.talents.has_r3 == 1 then
		if target:IsCreep() then
			bonus = self.talents.r3_creeps
		else
			bonus = self.talents.r3_damage * (target:GetMaxHealth() - target:GetHealth())
		end
		target:SendNumber(6, bonus)
		damage = damage + bonus
	end

	if damage_ability == "shard" then
		damage = damage * self.shard_damage
	end

	if self.caster.fist_ability then
		self.caster.fist_ability:ProcDamage(target)
	end

	if self.caster.ember_innate then
		target:AddNewModifier(self.caster, self.caster.ember_innate, "modifier_ember_spirit_innate_custom_burn", {})
	end

	DoDamage(
		{ victim = target, attacker = self.caster, damage = damage, damage_type = DAMAGE_TYPE_MAGICAL, ability = self },
		damage_ability
	)

	if self.talents.has_h4 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_ember_spirit_activate_fire_remnant_custom_slow",
			{ duration = self.talents.h4_duration }
		)
		if
			not target:IsDebuffImmune()
			and not target:HasModifier("modifier_ember_spirit_activate_fire_remnant_custom_silence_cd")
		then
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_ember_spirit_activate_fire_remnant_custom_silence",
				{ duration = (1 - target:GetStatusResistance()) * self.talents.h4_silence }
			)
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_ember_spirit_activate_fire_remnant_custom_silence_cd",
				{ duration = self.talents.h4_talent_cd }
			)

			target:EmitSound("Ember.Remnant_stun")
			local particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_ogre_magi/ogre_magi_fireblast.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				target
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				Vector(0, 0, 0),
				true
			)
			ParticleManager:SetParticleControl(particle, 1, target:GetOrigin())
			ParticleManager:ReleaseParticleIndex(particle)
		end
	end
end

function ember_spirit_activate_fire_remnant_custom:Explosion(remnant, damage_ability)
	if not IsValid(remnant) then
		return
	end
	if remnant.ended then
		return
	end
	remnant.ended = true

	local radius = self.radius
	local point = remnant:GetAbsOrigin()

	if damage_ability ~= "shard" then
		if remnant.targets_hit then
			for _, target in pairs(self.caster:FindTargets(radius, point)) do
				if not remnant.targets_hit[target:entindex()] then
					remnant.targets_hit[target:entindex()] = target
					self:DealDamage(target, damage_ability)
				end
			end
		end

		self:ProcFire(point)
		remnant:RemoveModifierByName("modifier_ember_spirit_fire_remnant_custom_remnant")
	end

	if self.caster.fist_ability then
		self.caster.fist_ability:ProcCd()
	end

	if IsValid(self.caster.remnant_ability) and self.caster.remnant_ability.tracker then
		self.caster.remnant_ability.tracker:SpellEvent({ unit = self.caster })
	end

	EmitSoundOnLocationWithCaster(point, "Hero_EmberSpirit.FireRemnant.Explode", self.caster)
end

function ember_spirit_activate_fire_remnant_custom:ProcFire(point)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r1 == 0 then
		return
	end

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker",
		{ duration = self.talents.r1_duration },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_ember_spirit_activate_fire_remnant_custom_caster = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_caster:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.fire_duration = self.ability.talents.r1_duration
	self.fire_radius = self.ability.talents.r1_radius + 50

	self.old_pos = self.parent:GetAbsOrigin()
	self.dist = self.fire_radius
	self.is_shard = params.is_shard

	self.parent:NoDraw(self, true)
	self.parent:AddNoDraw()
	self.parent:EmitSound("Hero_EmberSpirit.FireRemnant.Activate")
	self.parent:SetLocalAngles(0, 0, 0)

	if not self:ApplyHorizontalMotionController() then
		self:Destroy()
		return
	end

	self.thinker = CreateModifierThinker(
		self.parent,
		self.ability,
		"modifier_ember_spirit_activate_fire_remnant_custom_thinker",
		nil,
		self.parent:GetAbsOrigin(),
		self.parent:GetTeamNumber(),
		false
	)
	local iParticleID = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_ember_spirit/ember_spirit_remnant_dash.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.thinker
	)
	ParticleManager:SetParticleControlEnt(
		iParticleID,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		iParticleID,
		1,
		self.thinker,
		PATTACH_CUSTOMORIGIN_FOLLOW,
		nil,
		self.thinker:GetAbsOrigin(),
		true
	)
	self:AddParticle(iParticleID, false, false, -1, false, false)
end

function modifier_ember_spirit_activate_fire_remnant_custom_caster:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:StopSound("Hero_EmberSpirit.FireRemnant.Activate")
	self.parent:EmitSound("Hero_EmberSpirit.FireRemnant.Stop")

	self.parent:RemoveHorizontalMotionController(self)
	self.parent:RemoveNoDraw()
	self.parent:EndNoDraw(self)

	if IsValid(self.thinker) then
		self.thinker:RemoveSelf()
	end
end

function modifier_ember_spirit_activate_fire_remnant_custom_caster:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end

	if not self.ability or self.ability.vLocation == nil then
		self:Destroy()
		return
	end

	self.dist = self.dist + (self.ability.vLocation - self.old_pos):Length2D()

	if self.ability.talents.has_r1 == 1 and self.is_shard == 0 and self.dist >= self.fire_radius then
		self.dist = 0
		self.ability:ProcFire(self.ability.vLocation)
	end

	self.thinker:SetAbsOrigin(self.ability.vLocation)
	me:SetAbsOrigin(self.ability.vLocation)
	self.old_pos = self.ability.vLocation
end

function modifier_ember_spirit_activate_fire_remnant_custom_caster:OnHorizontalMotionInterrupted()
	if not IsServer() then
		return
	end
	self:Destroy()
end

function modifier_ember_spirit_activate_fire_remnant_custom_caster:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_ROOTED] = true,
	}
end

function modifier_ember_spirit_activate_fire_remnant_custom_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
	}
end

function modifier_ember_spirit_activate_fire_remnant_custom_caster:GetModifierDisableTurning(params)
	return 1
end

function modifier_ember_spirit_activate_fire_remnant_custom_caster:GetModifierIgnoreCastAngle()
	return 1
end

modifier_ember_spirit_activate_fire_remnant_custom_thinker = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_thinker:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_TEAM_MOVE_TO] = true,
		[MODIFIER_STATE_NO_TEAM_SELECT] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
	}
end

modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker:IsAura()
	return true
end
function modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker:GetAuraDuration()
	return self.linger
end
function modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker:GetAuraRadius()
	return self.radius
end
function modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker:GetModifierAura()
	return "modifier_ember_spirit_activate_fire_remnant_custom_burn"
end
function modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker:OnCreated()
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.talents.r1_radius
	self.duration = self.ability.talents.r1_duration
	self.linger = self.ability.talents.r1_linger

	self.start_pos = self.parent:GetAbsOrigin()

	self.nFXIndex = ParticleManager:CreateParticle("particles/ember_spirit/remnant_fire.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.nFXIndex, 0, self.start_pos)
	ParticleManager:SetParticleControl(self.nFXIndex, 1, self.start_pos)
	ParticleManager:SetParticleControl(self.nFXIndex, 2, Vector(self.radius, 0, 0))
	ParticleManager:SetParticleControl(self.nFXIndex, 4, Vector(self.duration - 1, 0, 0))
	ParticleManager:ReleaseParticleIndex(self.nFXIndex)
	self:AddParticle(self.nFXIndex, false, false, -1, false, false)

	self.parent:EmitSound("Ember.Fire_burn")
end

function modifier_ember_spirit_activate_fire_remnant_custom_fire_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Ember.Fire_burn")
end

modifier_ember_spirit_activate_fire_remnant_custom_burn = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_burn:GetEffectName()
	return "particles/units/heroes/hero_phoenix/phoenix_icarus_dive_burn_debuff.vpcf"
end
function modifier_ember_spirit_activate_fire_remnant_custom_burn:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.interval = self.ability.talents.r1_interval
	self.damage = self.ability.talents.r1_damage * self.interval

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Ember.Fire_burn_target")

	self.damage_table = {
		attacker = self.caster,
		victim = self.parent,
		damage = self.damage,
		ability = self.ability,
		damage_type = self.ability.talents.r1_damage_type,
	}
	self:StartIntervalThink(self.interval)
end

function modifier_ember_spirit_activate_fire_remnant_custom_burn:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Ember.Fire_burn_target")
end

function modifier_ember_spirit_activate_fire_remnant_custom_burn:OnIntervalThink()
	if not IsServer() then
		return
	end
	DoDamage(self.damage_table, "modifier_ember_remnant_1")
end

modifier_ember_spirit_activate_fire_remnant_custom_auto_cd = class(mod_cd)
function modifier_ember_spirit_activate_fire_remnant_custom_auto_cd:GetTexture()
	return "buffs/ember_spirit/FireRemnant_4"
end

modifier_ember_spirit_activate_fire_remnant_custom_silence_cd = class(mod_hidden)

modifier_ember_spirit_activate_fire_remnant_custom_slow = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_slow:IsPurgable()
	return true
end
function modifier_ember_spirit_activate_fire_remnant_custom_slow:GetEffectName()
	return "particles/units/heroes/hero_terrorblade/ember_slow.vpcf"
end
function modifier_ember_spirit_activate_fire_remnant_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.h4_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", self)
end

function modifier_ember_spirit_activate_fire_remnant_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_ember_spirit_activate_fire_remnant_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_ember_spirit_activate_fire_remnant_custom_silence = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_silence:IsPurgable()
	return true
end
function modifier_ember_spirit_activate_fire_remnant_custom_silence:GetEffectName()
	return "particles/generic_gameplay/generic_silenced.vpcf"
end
function modifier_ember_spirit_activate_fire_remnant_custom_silence:ShouldUseOverheadOffset()
	return true
end
function modifier_ember_spirit_activate_fire_remnant_custom_silence:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end
function modifier_ember_spirit_activate_fire_remnant_custom_silence:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.miss = self.ability.talents.h4_miss

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/ember_spirit/attack_slow.vpcf", self)
end

function modifier_ember_spirit_activate_fire_remnant_custom_silence:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

function modifier_ember_spirit_activate_fire_remnant_custom_silence:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MISS_PERCENTAGE,
	}
end

function modifier_ember_spirit_activate_fire_remnant_custom_silence:GetModifierMiss_Percentage()
	return self.miss
end

ember_spirit_fire_remnant_burst = class({})
ember_spirit_fire_remnant_burst.talents = {}

function ember_spirit_fire_remnant_burst:CreateTalent()
	self:SetHidden(false)
end

function ember_spirit_fire_remnant_burst:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_talent_cd = caster:GetTalentValue("modifier_ember_remnant_7", "talent_cd", true),
			r7_radius = caster:GetTalentValue("modifier_ember_remnant_7", "radius", true),
			r7_count = caster:GetTalentValue("modifier_ember_remnant_7", "count", true),
			r7_cast = caster:GetTalentValue("modifier_ember_remnant_7", "cast", true),
		}
	end
end

function ember_spirit_fire_remnant_burst:GetAOERadius()
	return self.talents.r7_radius or 0
end

function ember_spirit_fire_remnant_burst:GetChannelTime()
	return (self.talents.r7_cast or 0) + 2 * FrameTime()
end

function ember_spirit_fire_remnant_burst:GetCooldown()
	return self.talents.r7_talent_cd or 0
end

function ember_spirit_fire_remnant_burst:OnAbilityPhaseStart()
	return not self.caster:HasModifier("modifier_ember_spirit_activate_fire_remnant_custom_caster")
end

function ember_spirit_fire_remnant_burst:OnSpellStart()
	local point = self:GetCursorPosition()
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_ember_spirit_activate_fire_remnant_custom_legendary",
		{ x = point.x, y = point.y }
	)
end

function ember_spirit_fire_remnant_burst:OnChannelFinish(bInterrupted)
	if not IsServer() then
		return
	end
	self.caster:RemoveModifierByName("modifier_ember_spirit_activate_fire_remnant_custom_legendary")
end

modifier_ember_spirit_activate_fire_remnant_custom_legendary = class(mod_hidden)
function modifier_ember_spirit_activate_fire_remnant_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.remnant_ability = self.parent.remnant_ability

	self.max = self.ability.talents.r7_count
	self.count = self.max
	self.interval = self.ability.talents.r7_cast / (self.max - 1) - FrameTime()

	self.radius = self.ability.talents.r7_radius
	self.center = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.vec = RandomVector(self.radius * 0.7)

	self.line_position = self.center + self.vec
	self.qangle_rotation_rate = 360 / (self.max - 1)

	local cast_pfx =
		ParticleManager:CreateParticle("particles/ember_spirit/legendary_aoe.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(cast_pfx, 0, self.center)
	ParticleManager:SetParticleControl(cast_pfx, 1, Vector(self.radius, 1, 1))
	ParticleManager:ReleaseParticleIndex(cast_pfx)

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_ember_spirit_activate_fire_remnant_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.remnant_ability and self.remnant_ability:IsTrained() then
		local pos = self.line_position
		if self.count == self.max then
			pos = self.center
		end
		self.remnant_ability:Cast(pos)
	end

	self.count = self.count - 1

	if self.count <= 0 then
		self:Destroy()
		self.parent:Stop()
		return
	end

	self.line_position = RotatePosition(self.center, QAngle(0, self.qangle_rotation_rate, 0), self.line_position)
end

function modifier_ember_spirit_activate_fire_remnant_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_ember_spirit_activate_fire_remnant_custom_legendary:GetOverrideAnimation()
	return ACT_DOTA_TELEPORT
end