--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_thinker",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_debuff",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_slow",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_hero_4"
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_damage",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_bush_3"
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_vision",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_bush_4"
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_tracker",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_damage_status",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_heal",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_hero_2"
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_legendary_stack",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_bush_7"
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_legendary_damage",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_hoodwink_bush_7" }
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_legendary_illusion",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_legendary_invis",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_trap",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_bushwhack_custom_trap_icon",
	"abilities/hoodwink/hoodwink_bushwhack_custom",
	LUA_MODIFIER_MOTION_NONE
)

hoodwink_bushwhack_custom = class({})
hoodwink_bushwhack_custom.talents = {}

function hoodwink_bushwhack_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_bushwhack_projectile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_bushwhack_fail.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_bushwhack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_bushwhack_target.vpcf", context)
	PrecacheResource("particle", "particles/tree_fx/tree_simple_explosion.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/scepter_trap.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/refresher.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_snapfire_slow.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/pa_vendetta.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_poison_venomancer.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/bush_damage.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_purifyingflames.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/hoodwink_bush_damage.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/scepter_stun.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/acorn_refresh.vpcf", context)
end

function hoodwink_bushwhack_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_spell = 0,
			w1_damage = 0,

			w2_cd = 0,
			w2_stun = 0,

			has_h2 = 0,
			h2_str = 0,
			h2_heal = 0,
			h2_duration = caster:GetTalentValue("modifier_hoodwink_hero_2", "duration", true),

			has_w3 = 0,
			w3_damage = 0,
			w3_creeps = 0,
			w3_base = 0,
			w3_interval = caster:GetTalentValue("modifier_hoodwink_bush_3", "interval", true),
			w3_heal = caster:GetTalentValue("modifier_hoodwink_bush_3", "heal", true) / 100,
			w3_max = caster:GetTalentValue("modifier_hoodwink_bush_3", "max", true),
			w3_damage_type = caster:GetTalentValue("modifier_hoodwink_bush_3", "damage_type", true),
			w3_duration = caster:GetTalentValue("modifier_hoodwink_bush_3", "duration", true),

			has_w4 = 0,
			w4_duration = caster:GetTalentValue("modifier_hoodwink_bush_4", "duration", true),
			w4_damage_reduce = caster:GetTalentValue("modifier_hoodwink_bush_4", "damage_reduce", true),
			w4_heal_reduce = caster:GetTalentValue("modifier_hoodwink_bush_4", "heal_reduce", true),
			w4_health = caster:GetTalentValue("modifier_hoodwink_bush_4", "health", true),
			w4_bonus = caster:GetTalentValue("modifier_hoodwink_bush_4", "bonus", true),

			has_w7 = 0,
			w7_max = caster:GetTalentValue("modifier_hoodwink_bush_7", "max", true),
			w7_magic = caster:GetTalentValue("modifier_hoodwink_bush_7", "magic", true),
			w7_effect_duration = caster:GetTalentValue("modifier_hoodwink_bush_7", "effect_duration", true),
			w7_talent_cd = caster:GetTalentValue("modifier_hoodwink_bush_7", "talent_cd", true),
			w7_duration = caster:GetTalentValue("modifier_hoodwink_bush_7", "duration", true),
			w7_move = caster:GetTalentValue("modifier_hoodwink_bush_7", "move", true),
			w7_stack_duration = caster:GetTalentValue("modifier_hoodwink_bush_7", "stack_duration", true),
			w7_stun_reduce = caster:GetTalentValue("modifier_hoodwink_bush_7", "stun_reduce", true) / 100,

			has_h4 = 0,
			h4_silence = caster:GetTalentValue("modifier_hoodwink_hero_4", "silence", true),
			h4_slow = caster:GetTalentValue("modifier_hoodwink_hero_4", "slow", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_hoodwink_bush_1") then
		self.talents.w1_spell = caster:GetTalentValue("modifier_hoodwink_bush_1", "spell")
		self.talents.w1_damage = caster:GetTalentValue("modifier_hoodwink_bush_1", "damage")
	end

	if caster:HasTalent("modifier_hoodwink_bush_2") then
		self.talents.w2_cd = caster:GetTalentValue("modifier_hoodwink_bush_2", "cd")
		self.talents.w2_stun = caster:GetTalentValue("modifier_hoodwink_bush_2", "stun")
	end

	if caster:HasTalent("modifier_hoodwink_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_str = caster:GetTalentValue("modifier_hoodwink_hero_2", "str")
		self.talents.h2_heal = caster:GetTalentValue("modifier_hoodwink_hero_2", "heal") / self.talents.h2_duration
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_hoodwink_bush_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_hoodwink_bush_3", "damage") / 100
		self.talents.w3_creeps = caster:GetTalentValue("modifier_hoodwink_bush_3", "creeps")
		self.talents.w3_base = caster:GetTalentValue("modifier_hoodwink_bush_3", "base")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_hoodwink_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_hoodwink_bush_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_hoodwink_bush_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_hoodwink_sharp_7") then
		self.talents.has_r7 = 1
	end
end

function hoodwink_bushwhack_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_hoodwink_bushwhack_custom_tracker"
end

function hoodwink_bushwhack_custom:GetAOERadius()
	return (self.trap_radius or 0)
end

function hoodwink_bushwhack_custom:GetCastPoint()
	if self.talents.has_h4 == 1 then
		return 0
	end
	return self.BaseClass.GetCastPoint(self)
end

function hoodwink_bushwhack_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)
end

function hoodwink_bushwhack_custom:OnSpellStart(new_point, new_source, talent_name)
	if not IsServer() then
		return
	end
	local point = new_point or self:GetCursorPosition()
	local source = new_source or self.caster
	local origin = source:GetAbsOrigin()

	local projectile_speed = self.projectile_speed
	local delay = (point - origin):Length2D() / projectile_speed

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_hoodwink_bushwhack_custom_thinker",
		{ source = source:entindex(), duration = delay, talent_name = talent_name },
		point,
		self.caster:GetTeamNumber(),
		false
	)
end

function hoodwink_bushwhack_custom:AddPoison(target, stack)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_hoodwink_bushwhack_custom_damage",
		{ duration = self.talents.w3_duration, stack = stack or 1 }
	)
end

modifier_hoodwink_bushwhack_custom_thinker = class(mod_visible)
function modifier_hoodwink_bushwhack_custom_thinker:IsPurgable()
	return true
end
function modifier_hoodwink_bushwhack_custom_thinker:OnCreated(kv)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.location = self.parent:GetOrigin()
	self.source = EntIndexToHScript(kv.source)

	self.origin = GetGroundPosition(self.source:GetAbsOrigin(), nil)
	self.stun = self.ability.debuff_duration + self.ability.talents.w2_stun

	self.speed = self.ability.projectile_speed
	self.radius = self.ability.trap_radius

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_hoodwink/hoodwink_bushwhack_projectile.vpcf",
		PATTACH_WORLDORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControl(particle, 0, self.origin)
	ParticleManager:SetParticleControl(particle, 1, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(particle, 2, Vector(self.speed, 0, 0))
	self:AddParticle(particle, false, false, -1, false, false)

	self.talent_name = kv.talent_name

	if self.talent_name == "modifier_hoodwink_bush_7" then
		self.stun = self.stun * (1 + self.ability.talents.w7_stun_reduce)
	end
	self.source:EmitSound("Hero_Hoodwink.Bushwhack.Cast")
end

function modifier_hoodwink_bushwhack_custom_thinker:OnDestroy()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.location, self.radius, self.stun, false)

	local enemies = self.caster:FindTargets(self.radius, self.location)
	local trees = GridNav:GetAllTreesAroundPoint(self.location, self.radius, false)

	self.source:StopSound("Hero_Hoodwink.Bushwhack.Cast")
	self.parent:EmitSound("Hero_Hoodwink.Bushwhack.Impact")

	if #enemies <= 0 or #trees <= 0 then
		if self.caster:HasScepter() and not self.talent_name then
			CreateModifierThinker(
				self.caster,
				self.ability,
				"modifier_hoodwink_bushwhack_custom_trap",
				{},
				self.parent:GetAbsOrigin(),
				self.caster:GetTeamNumber(),
				false
			)
		end

		local particle = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_hoodwink/hoodwink_bushwhack_fail.vpcf",
			PATTACH_WORLDORIGIN,
			nil
		)
		ParticleManager:SetParticleControl(particle, 0, self.location)
		ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 0, 0))
		ParticleManager:ReleaseParticleIndex(particle)
		return
	end

	for _, enemy in pairs(enemies) do
		local origin = enemy:GetOrigin()
		local min_tree = trees[1]
		local min_treedist = (min_tree:GetOrigin() - origin):Length2D()

		for _, tree in pairs(trees) do
			local treedist = (tree:GetOrigin() - origin):Length2D()
			if treedist < min_treedist then
				min_tree = tree
				min_treedist = treedist
			end
		end
		local mod = enemy:FindModifierByName("modifier_hoodwink_bushwhack_custom_debuff")
		if mod then
			mod.forced_end = true
			mod:Destroy()
		end
		enemy:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_hoodwink_bushwhack_custom_debuff",
			{
				talent_name = self.talent_name,
				duration = self.stun * (1 - enemy:GetStatusResistance()),
				tree = min_tree:entindex(),
			}
		)
	end

	if self.ability.talents.has_h2 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_hoodwink_bushwhack_custom_heal",
			{ duration = self.ability.talents.h2_duration }
		)
	end

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_hoodwink/hoodwink_bushwhack.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.location)
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	UTIL_Remove(self.parent)
end

modifier_hoodwink_bushwhack_custom_debuff = class({})
function modifier_hoodwink_bushwhack_custom_debuff:IsPurgeException()
	return true
end
function modifier_hoodwink_bushwhack_custom_debuff:IsStunDebuff()
	return true
end
function modifier_hoodwink_bushwhack_custom_debuff:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.rate = self.ability.animation_rate

	if not IsServer() then
		return
	end
	self.talent_name = kv.talent_name

	self.duration = self:GetRemainingTime()
	self.distance = 150
	self.speed = 900
	self.interval = 0.25
	self.tick_count = math.floor(self.duration / self.interval)

	self.damage = (self.ability.total_damage + self.ability.talents.w1_damage) / self.tick_count

	self.ability:AddPoison(self.parent)

	if
		self.ability.talents.has_w7 == 1
		and not self.parent:HasModifier("modifier_hoodwink_bushwhack_custom_legendary_damage")
	then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_hoodwink_bushwhack_custom_legendary_stack",
			{ duration = self.ability.talents.w7_stack_duration }
		)
	end

	if self.ability.talents.has_w4 == 1 and self.parent:IsHero() then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_hoodwink_bushwhack_custom_vision",
			{ duration = self.ability.talents.w4_duration }
		)
	end

	if self.caster:HasScepter() and IsValid(self.caster.acorn_ability) then
		self.caster.acorn_ability:PerformHit(self.parent, self.parent:GetAbsOrigin(), false, false, true)
	end

	self.init = false
	self.tree_origin = self.parent:GetAbsOrigin()

	self.tree = -1
	self.height = 0
	local name = "particles/hoodwink/scepter_stun.vpcf"
	if kv.tree then
		self.tree = EntIndexToHScript(kv.tree)
		self.tree_origin = self.tree:GetOrigin()
		name = "particles/units/heroes/hero_hoodwink/hoodwink_bushwhack_target.vpcf"
		self.height = self.ability.visual_height
	end

	if not self:ApplyHorizontalMotionController() then
		return
	end

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage = self.damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
		ability = self.ability,
	}

	local particle = ParticleManager:CreateParticle(name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(particle, 15, self.tree_origin)
	self:AddParticle(particle, false, false, -1, false, false)
	self.parent:EmitSound("Hero_Hoodwink.Bushwhack.Target")

	self.count = 0
	self:StartIntervalThink(self.interval)
	self:SetHasCustomTransmitterData(true)
end

function modifier_hoodwink_bushwhack_custom_debuff:AddCustomTransmitterData()
	return {
		height = self.height,
	}
end

function modifier_hoodwink_bushwhack_custom_debuff:HandleCustomTransmitterData(data)
	self.height = data.height
end

function modifier_hoodwink_bushwhack_custom_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.tree ~= -1 then
		if not self.tree.IsStanding then
			if self.tree:IsNull() then
				self:Destroy()
			end
		elseif not self.tree:IsStanding() then
			self:Destroy()
		end
	end

	if self.caster:GetQuest() == "Hoodwink.Quest_6" and self.parent:IsRealHero() then
		self.caster:UpdateQuest(self.interval)
	end

	if self.talent_name then
		return
	end
	if self.count >= self.tick_count then
		return
	end
	self.count = self.count + 1

	DoDamage(self.damageTable)
end

function modifier_hoodwink_bushwhack_custom_debuff:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_h4 == 1 and not self.forced_end and not self.talent_name then
		self.parent:EmitSound("SF.Raze_silence")
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_hoodwink_bushwhack_custom_slow",
			{ duration = self.ability.talents.h4_silence * (1 - self.parent:GetStatusResistance()) }
		)
	end

	self.parent:RemoveHorizontalMotionController(self)
end

function modifier_hoodwink_bushwhack_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_FIXED_DAY_VISION,
		MODIFIER_PROPERTY_FIXED_NIGHT_VISION,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION_RATE,
		MODIFIER_PROPERTY_VISUAL_Z_DELTA,
		MODIFIER_PROPERTY_BONUS_VISION_PERCENTAGE,
		MODIFIER_PROPERTY_DONT_GIVE_VISION_OF_ATTACKER,
	}
end

function modifier_hoodwink_bushwhack_custom_debuff:GetBonusVisionPercentage()
	return -100
end

function modifier_hoodwink_bushwhack_custom_debuff:GetModifierNoVisionOfAttacker()
	return 1
end

function modifier_hoodwink_bushwhack_custom_debuff:GetFixedDayVision()
	return 0
end

function modifier_hoodwink_bushwhack_custom_debuff:GetFixedNightVision()
	return 0
end

function modifier_hoodwink_bushwhack_custom_debuff:GetOverrideAnimation()
	return ACT_DOTA_FLAIL
end

function modifier_hoodwink_bushwhack_custom_debuff:GetOverrideAnimationRate()
	return self.rate
end

function modifier_hoodwink_bushwhack_custom_debuff:GetVisualZDelta()
	return self.height
end

function modifier_hoodwink_bushwhack_custom_debuff:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

function modifier_hoodwink_bushwhack_custom_debuff:UpdateHorizontalMotion(me, dt)
	local origin = me:GetOrigin()
	local dir = self.tree_origin - origin
	local dist = dir:Length2D()
	dir.z = 0
	dir = dir:Normalized()

	if dist < self.distance then
		self.parent:RemoveHorizontalMotionController(self)
		local particle =
			ParticleManager:CreateParticle("particles/tree_fx/tree_simple_explosion.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, self.parent:GetOrigin())
		ParticleManager:ReleaseParticleIndex(particle)
		return
	end

	local target = dir * self.speed * dt
	me:SetOrigin(origin + target)
end

function modifier_hoodwink_bushwhack_custom_debuff:OnHorizontalMotionInterrupted()
	self.parent:RemoveHorizontalMotionController(self)
end

modifier_hoodwink_bushwhack_custom_tracker = class(mod_hidden)
function modifier_hoodwink_bushwhack_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.legendary_ability = self.parent:FindAbilityByName("hoodwink_decoy_custom")
	if IsValid(self.legendary_ability) then
		if IsServer() and not self.legendary_ability:IsTrained() then
			self.legendary_ability:SetLevel(1)
		end
		self.legendary_ability:UpdateTalents()
	end

	self.parent.bush_ability = self.ability
	self.active_traps = {}

	self.ability.scepter_max = self.ability:GetSpecialValueFor("scepter_max")
	self.ability.scepter_timer = self.ability:GetSpecialValueFor("scepter_timer")
	self.ability.scepter_linger = self.ability:GetSpecialValueFor("scepter_linger")
	self.ability.scepter_delay = self.ability:GetSpecialValueFor("scepter_delay")

	self.ability.trap_radius = self.ability:GetSpecialValueFor("trap_radius")
	self.ability.debuff_duration = self.ability:GetSpecialValueFor("debuff_duration")
	self.ability.projectile_speed = self.ability:GetSpecialValueFor("projectile_speed")
	self.ability.total_damage = self.ability:GetSpecialValueFor("total_damage")
	self.ability.animation_rate = self.ability:GetSpecialValueFor("animation_rate")
	self.ability.visual_height = self.ability:GetSpecialValueFor("visual_height")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_hoodwink_bushwhack_custom_tracker:OnRefresh()
	self.ability.debuff_duration = self.ability:GetSpecialValueFor("debuff_duration")
	self.ability.total_damage = self.ability:GetSpecialValueFor("total_damage")
end

function modifier_hoodwink_bushwhack_custom_tracker:OnDestroy()
	if not IsServer() then
		return
	end

	for i = 1, #self.active_traps do
		local index = self.active_traps[1]
		if index then
			local unit = EntIndexToHScript(index)
			if IsValid(unit) then
				unit:RemoveModifierByName("modifier_hoodwink_bushwhack_custom_trap")
				if IsValid(unit) then
					UTIL_Remove(unit)
				end
			end
		end
	end
end

function modifier_hoodwink_bushwhack_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_STATS_STRENGTH_BONUS,
	}
end

function modifier_hoodwink_bushwhack_custom_tracker:GetProcChance()
	return 100
end

function modifier_hoodwink_bushwhack_custom_tracker:AttackProc(params, name)
	if self.ability.talents.has_w3 == 0 then
		return
	end
	local target = params.target

	local mod = target:FindModifierByName("modifier_hoodwink_bushwhack_custom_damage")
	if mod then
		mod:SetDuration(self.ability.talents.w3_duration, true)
	end
end

function modifier_hoodwink_bushwhack_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.w1_spell
end

function modifier_hoodwink_bushwhack_custom_tracker:GetModifierBonusStats_Strength()
	return self.ability.talents.h2_str
end

modifier_hoodwink_bushwhack_custom_slow = class(mod_hidden)
function modifier_hoodwink_bushwhack_custom_slow:IsPurgable()
	return true
end
function modifier_hoodwink_bushwhack_custom_slow:GetEffectName()
	return "particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf"
end
function modifier_hoodwink_bushwhack_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.slow = self.ability.talents.h4_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/generic_gameplay/generic_silenced.vpcf", self, true)
end

function modifier_hoodwink_bushwhack_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_hoodwink_bushwhack_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_hoodwink_bushwhack_custom_slow:CheckState()
	return {
		[MODIFIER_STATE_SILENCED] = true,
	}
end

modifier_hoodwink_bushwhack_custom_damage = class(mod_visible)
function modifier_hoodwink_bushwhack_custom_damage:GetTexture()
	return "buffs/hoodwink/bush_3"
end
function modifier_hoodwink_bushwhack_custom_damage:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w3_max
	self.interval = self.ability.talents.w3_interval
	self.damage = self.ability.talents.w3_damage / self.max
	self.base = self.ability.talents.w3_base / self.max
	self.creeps = self.ability.talents.w3_creeps / self.max
	self.damage_type = self.ability.talents.w3_damage_type

	if not IsServer() then
		return
	end
	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = self.damage_type }

	for i = 1, 3 do
		self.parent:GenericParticle("particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", self)
	end

	self:OnRefresh(table)
	self:StartIntervalThink(self.interval)
end

function modifier_hoodwink_bushwhack_custom_damage:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:SetStackCount(math.min(self.max, self:GetStackCount() + table.stack))
	self.parent:EmitSound("Hoodwink.Poison")

	if self:GetStackCount() == self.max then
		self.parent:EmitSound("Hoodwink.Poison_max")
		self.parent:AddNewModifier(self.caster, self.ability, "modifier_hoodwink_bushwhack_custom_damage_status", {})
	end
end

function modifier_hoodwink_bushwhack_custom_damage:OnIntervalThink()
	if not IsServer() then
		return
	end

	local damage = self.base + self.damage * self.parent:GetMaxHealth()
	if self.parent:IsCreep() then
		damage = self.creeps
	end

	self.damageTable.damage = self:GetStackCount() * damage * self.interval
	local real_damage = DoDamage(self.damageTable, "modifier_hoodwink_bush_3")
	local result = self.caster:CanLifesteal(self.parent)
	if result then
		self.caster:GenericHeal(
			real_damage * result * self.ability.talents.w3_heal,
			self.ability,
			true,
			"",
			"modifier_hoodwink_bush_3"
		)
	end
end

function modifier_hoodwink_bushwhack_custom_damage:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_hoodwink_bushwhack_custom_damage_status")
end

modifier_hoodwink_bushwhack_custom_damage_status = class(mod_hidden)
function modifier_hoodwink_bushwhack_custom_damage_status:GetStatusEffectName()
	return "particles/status_fx/status_effect_poison_venomancer.vpcf"
end
function modifier_hoodwink_bushwhack_custom_damage_status:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end

modifier_hoodwink_bushwhack_custom_vision = class(mod_visible)
function modifier_hoodwink_bushwhack_custom_vision:GetTexture()
	return "buffs/hoodwink/hero_6"
end
function modifier_hoodwink_bushwhack_custom_vision:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.damage_reduce = self.ability.talents.w4_damage_reduce
	self.heal_reduce = self.ability.talents.w4_heal_reduce
	self.health = self.ability.talents.w4_health
	self.bonus = self.ability.talents.w4_bonus

	self.RemoveForDuel = true
	if not IsServer() then
		return
	end
	if not self.parent:IsRealHero() then
		return
	end
	self.parent:GenericParticle("particles/phantom_assassin/pa_vendetta.vpcf", self)
	self.parent:GenericParticle("particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf", self)
	self.interval = 0.2
	self:StartIntervalThink(self.interval)
end

function modifier_hoodwink_bushwhack_custom_vision:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 10, self.interval * 2, false)
end

function modifier_hoodwink_bushwhack_custom_vision:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_hoodwink_bushwhack_custom_vision:GetModifierHealChange()
	return self.heal_reduce * (self.parent:GetHealthPercent() <= self.health and self.bonus or 1)
end

function modifier_hoodwink_bushwhack_custom_vision:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * (self.parent:GetHealthPercent() <= self.health and self.bonus or 1)
end

function modifier_hoodwink_bushwhack_custom_vision:GetModifierSpellAmplify_Percentage()
	return self.damage_reduce * (self.parent:GetHealthPercent() <= self.health and self.bonus or 1)
end

function modifier_hoodwink_bushwhack_custom_vision:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce * (self.parent:GetHealthPercent() <= self.health and self.bonus or 1)
end

modifier_hoodwink_bushwhack_custom_heal = class(mod_visible)
function modifier_hoodwink_bushwhack_custom_heal:GetTexture()
	return "buffs/hoodwink/hero_2"
end
function modifier_hoodwink_bushwhack_custom_heal:GetEffectName()
	return "particles/units/heroes/hero_oracle/oracle_purifyingflames.vpcf"
end
function modifier_hoodwink_bushwhack_custom_heal:OnCreated()
	self.ability = self:GetAbility()
end

function modifier_hoodwink_bushwhack_custom_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_hoodwink_bushwhack_custom_heal:GetModifierHealthRegenPercentage()
	return self.ability.talents.h2_heal
end

modifier_hoodwink_bushwhack_custom_legendary_stack = class(mod_visible)
function modifier_hoodwink_bushwhack_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.w7_max

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true

	if self.ability.talents.has_r7 == 0 then
		self.particle = self.parent:GenericParticle("particles/hoodwink/hoodwink_bush_damage.vpcf", self, true)
	end

	self:OnRefresh()
end

function modifier_hoodwink_bushwhack_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self.particle then
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
	end

	if self:GetStackCount() < self.max then
		return
	end

	self.parent:EmitSound("Hoodwink.Bushwak_legendary_start")
	self.parent:EmitSound("Hoodwink.Bushwak_legendary_start2")
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_hoodwink_bushwhack_custom_legendary_damage",
		{ duration = self.ability.talents.w7_effect_duration }
	)
	self:Destroy()
end

modifier_hoodwink_bushwhack_custom_legendary_damage = class(mod_visible)
function modifier_hoodwink_bushwhack_custom_legendary_damage:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.magic = self.ability.talents.w7_magic

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true

	self.max_time = self:GetRemainingTime()
	if self.parent:IsRealHero() and not IsValid(self.ability.active_damage_mod) then
		self.ability.active_damage_mod = self
		self:OnIntervalThink()
		self:StartIntervalThink(0.1)
	end

	self.parent:GenericParticle("particles/generic/generic_armor_reduction.vpcf", self, true)
	self.parent:GenericParticle("particles/hoodwink/bush_damage.vpcf", self)
end

function modifier_hoodwink_bushwhack_custom_legendary_damage:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.caster:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = math.floor(self.magic) .. "%",
		style = "HoodwinkBush",
	})
end

function modifier_hoodwink_bushwhack_custom_legendary_damage:OnDestroy()
	if not IsServer() then
		return
	end

	if self == self.ability.active_damage_mod then
		self.ability.active_damage_mod = nil
		self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "HoodwinkBush" })
	end
end

function modifier_hoodwink_bushwhack_custom_legendary_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_hoodwink_bushwhack_custom_legendary_damage:GetModifierMagicalResistanceBonus(params)
	if IsServer() then
		local hit_effect = ParticleManager:CreateParticle(
			"particles/units/heroes/hero_monkey_king/monkey_king_quad_tap_hit.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)
		self.parent:EmitSound("Hoodwink.Bushwak_legendary_damage")
	end

	return self.magic
end

modifier_hoodwink_bushwhack_custom_trap = class(mod_hidden)
function modifier_hoodwink_bushwhack_custom_trap:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.radius = self.ability.trap_radius

	if not IsValid(self.ability.tracker) then
		self:Destroy()
		return
	end

	table.insert(self.ability.tracker.active_traps, self.parent:entindex())

	if #self.ability.tracker.active_traps > self.ability.scepter_max then
		local entindex = self.ability.tracker.active_traps[1]
		local unit = EntIndexToHScript(entindex)
		if unit then
			unit:RemoveModifierByName("modifier_hoodwink_bushwhack_custom_trap")
			if IsValid(unit) then
				UTIL_Remove(unit)
			end
		end
	end

	self.icon = CreateUnitByName(
		"npc_dota_treant_eyes_custom",
		self.parent:GetAbsOrigin(),
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	self.icon:AddNewModifier(self.caster, self.ability, "modifier_hoodwink_bushwhack_custom_trap_icon", {})

	self.particle = ParticleManager:CreateParticle("particles/hoodwink/scepter_trap.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle, 0, GetGroundPosition(self.parent:GetAbsOrigin(), nil))
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.radius, self.radius, self.radius))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.interval = 0.1
	self.count = 0
	self.active = false
	self.linger = self.ability.scepter_linger
	self.max_count = self.ability.scepter_timer

	self.stun = self.ability.debuff_duration + self.ability.talents.w2_stun
	self.targets = {}

	self:StartIntervalThink(self.interval)
end

function modifier_hoodwink_bushwhack_custom_trap:OnIntervalThink()
	if not IsServer() then
		return
	end

	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetAbsOrigin(), self.radius, self.interval * 2, false)

	self.count = self.count + self.interval
	if self.count >= self.max_count and self.active == false and not self.ending then
		self.count = 0
		self.active = true
		if self.ability:GetCooldownTimeRemaining() > 0 then
			self.ability:EndCd(0)
			local particle = ParticleManager:CreateParticle(
				"particles/hoodwink/acorn_refresh.vpcf",
				PATTACH_CUSTOMORIGIN,
				self.caster
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				self.caster,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.caster:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle)
			self.caster:EmitSound("Hoodwink.Scepter_refresh")
		end
	end

	if self:GetElapsedTime() < self.ability.scepter_delay then
		return
	end

	for _, enemy in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
		if not self.targets[enemy] and enemy:IsHero() then
			local mod = enemy:FindModifierByName("modifier_hoodwink_bushwhack_custom_debuff")
			if mod then
				mod.forced_end = true
				mod:Destroy()
			end
			enemy:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_hoodwink_bushwhack_custom_debuff",
				{ duration = self.stun * (1 - enemy:GetStatusResistance()) }
			)

			local particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_hoodwink/hoodwink_bushwhack.vpcf",
				PATTACH_WORLDORIGIN,
				nil
			)
			ParticleManager:SetParticleControl(particle, 0, GetGroundPosition(self.parent:GetAbsOrigin(), nil))
			ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 0, 0))
			ParticleManager:ReleaseParticleIndex(particle)

			enemy:EmitSound("Hero_Hoodwink.Bushwhack.Impact")
			self.targets[enemy] = true

			if not self.ending then
				self.ending = true
				self:SetDuration(self.linger, true)
			end
		end
	end
end

function modifier_hoodwink_bushwhack_custom_trap:OnDestroy()
	if not IsServer() then
		return
	end

	if IsValid(self.ability.tracker) then
		for index, entindex in pairs(self.ability.tracker.active_traps) do
			if entindex == self.parent:entindex() then
				table.remove(self.ability.tracker.active_traps, index)
				break
			end
		end
	end

	if IsValid(self.icon) then
		self.icon:RemoveSelf()
	end

	UTIL_Remove(self.parent)
end

modifier_hoodwink_bushwhack_custom_trap_icon = class(mod_hidden)
function modifier_hoodwink_bushwhack_custom_trap_icon:CheckState()
	return {
		[MODIFIER_STATE_INVISIBLE] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
	}
end

hoodwink_decoy_custom = class({})
hoodwink_decoy_custom.talents = {}

function hoodwink_decoy_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w7_talent_cd = caster:GetTalentValue("modifier_hoodwink_bush_7", "talent_cd", true),
			w7_duration = caster:GetTalentValue("modifier_hoodwink_bush_7", "duration", true),
			w7_incoming = caster:GetTalentValue("modifier_hoodwink_bush_7", "incoming", true),
			w7_move = caster:GetTalentValue("modifier_hoodwink_bush_7", "move", true),
			w7_range = caster:GetTalentValue("modifier_hoodwink_bush_7", "range", true),
		}
	end
end

function hoodwink_decoy_custom:CreateTalent()
	self:SetHidden(false)
end

function hoodwink_decoy_custom:GetCooldown(iLevel)
	return self.talents.w7_talent_cd or 0
end

function hoodwink_decoy_custom:GetCastRange(vLocation, hTarget)
	return self.talents.w7_range or 0
end

function hoodwink_decoy_custom:OnSpellStart()
	local cast_point = self:GetCursorPosition()
	local vec = cast_point - self.caster:GetAbsOrigin()
	if vec:Length2D() > self.talents.w7_range then
		cast_point = self.caster:GetAbsOrigin() + vec:Normalized() * self.talents.w7_range
	end

	local duration = self.talents.w7_duration
	local damage_out = -100
	local damage_in = self.talents.w7_incoming - 100

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_hoodwink_bushwhack_custom_legendary_invis",
		{ duration = duration }
	)

	local point = self.caster:GetAbsOrigin()

	local illusions = CreateIllusions(
		self.caster,
		self.caster,
		{ duration = duration, outgoing_damage = damage_out, incoming_damage = damage_in },
		1,
		0,
		false,
		false
	)

	for _, illusion in pairs(illusions) do
		for _, mod in pairs(self.caster:FindAllModifiers()) do
			if mod.StackOnIllusion ~= nil and mod.StackOnIllusion == true then
				illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount(), mod)
			end
		end

		illusion:SetAbsOrigin(point)
		illusion:FacePoint(point + self.caster:GetForwardVector() * 10)
		illusion.owner = self.caster

		if IsValid(self.caster.scurry_ability) then
			illusion:AddNewModifier(
				self.caster,
				self.caster.scurry_ability,
				"modifier_hoodwink_scurry_custom_buff",
				{ duration = duration }
			)
		end
		illusion:AddNewModifier(
			self.caster,
			self,
			"modifier_hoodwink_bushwhack_custom_legendary_illusion",
			{ x = cast_point.x, y = cast_point.y }
		)
	end
end

modifier_hoodwink_bushwhack_custom_legendary_invis = class(mod_visible)
function modifier_hoodwink_bushwhack_custom_legendary_invis:GetEffectName()
	return "particles/items3_fx/blink_swift_buff.vpcf"
end
function modifier_hoodwink_bushwhack_custom_legendary_invis:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.move = self.ability.talents.w7_move

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.parent:AddAttackStartEvent_out(self, true)
	self.parent:AddSpellEvent(self, true)
end

function modifier_hoodwink_bushwhack_custom_legendary_invis:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INVISIBILITY_LEVEL,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_hoodwink_bushwhack_custom_legendary_invis:SpellEvent(params)
	if not IsServer() then
		return
	end
	if not params.ability then
		return
	end
	if not params.unit then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	self:Destroy()
end

function modifier_hoodwink_bushwhack_custom_legendary_invis:AttackStartEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.attacker then
		return
	end
	if params.attacker ~= self.parent then
		return
	end
	self:Destroy()
end

function modifier_hoodwink_bushwhack_custom_legendary_invis:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_hoodwink_bushwhack_custom_legendary_invis:GetModifierInvisibilityLevel()
	return 1
end

function modifier_hoodwink_bushwhack_custom_legendary_invis:CheckState()
	return {
		[MODIFIER_STATE_INVISIBLE] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

modifier_hoodwink_bushwhack_custom_legendary_illusion = class(mod_hidden)
function modifier_hoodwink_bushwhack_custom_legendary_illusion:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()

	self.attack_range = -1 * self.parent:Script_GetAttackRange()
	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)

	self.parent:AddAttackStartEvent_inc(self, true)
	self.caster:AddSpellEvent(self, true)

	self:StartIntervalThink(FrameTime())
end

function modifier_hoodwink_bushwhack_custom_legendary_illusion:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.parent:MoveToPosition(self.point)
	self:StartIntervalThink(-1)
end

function modifier_hoodwink_bushwhack_custom_legendary_illusion:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
	}
end

function modifier_hoodwink_bushwhack_custom_legendary_illusion:GetModifierAttackRangeBonus()
	return self.attack_range
end

function modifier_hoodwink_bushwhack_custom_legendary_illusion:AttackStartEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.target then
		return
	end
	local attacker = params.attacker

	if not attacker:IsHero() then
		return
	end
	self:UseBush(attacker:GetAbsOrigin() + RandomVector(80))
	self:Destroy()
end

function modifier_hoodwink_bushwhack_custom_legendary_illusion:SpellEvent(params)
	if not IsServer() then
		return
	end
	local attacker = params.unit
	if not params.target then
		return
	end

	if self.parent:GetTeamNumber() == attacker:GetTeamNumber() then
		return
	end
	if self.parent ~= params.target then
		return
	end
	if not attacker:IsHero() then
		return
	end

	self:UseBush(attacker:GetAbsOrigin() + RandomVector(80))
	self:Destroy()
end

function modifier_hoodwink_bushwhack_custom_legendary_illusion:UseBush(point)
	if not IsServer() then
		return
	end
	if self.stun_proc then
		return
	end
	if not IsValid(self.caster.acorn_ability) then
		return
	end
	if not IsValid(self.caster.bush_ability) then
		return
	end
	if not self.caster.acorn_ability:IsTrained() then
		return
	end

	self.stun_proc = true
	self.caster.acorn_ability:SpawnTree(point)
	self.caster.bush_ability:OnSpellStart(point, self.parent, "modifier_hoodwink_bush_7")
end

function modifier_hoodwink_bushwhack_custom_legendary_illusion:OnDestroy()
	if not IsServer() then
		return
	end
	self:UseBush(self.parent:GetAbsOrigin())
	self.parent:Kill(nil, self.parent)
end

function modifier_hoodwink_bushwhack_custom_legendary_illusion:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end