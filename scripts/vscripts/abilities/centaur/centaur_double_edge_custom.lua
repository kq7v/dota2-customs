--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_centaur_double_edge_custom_legendary",
	"abilities/centaur/centaur_double_edge_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_edge_7"
)
LinkLuaModifier(
	"modifier_centaur_double_edge_custom_legendary_blood",
	"abilities/centaur/centaur_double_edge_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_centaur_double_edge_custom_tracker",
	"abilities/centaur/centaur_double_edge_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_centaur_double_edge_custom_slow",
	"abilities/centaur/centaur_double_edge_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_hero_2"
)
LinkLuaModifier(
	"modifier_centaur_double_edge_custom_silence_cd",
	"abilities/centaur/centaur_double_edge_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_centaur_hero_4"
)
LinkLuaModifier(
	"modifier_centaur_double_edge_custom_silence_ready",
	"abilities/centaur/centaur_double_edge_custom",
	LUA_MODIFIER_MOTION_NONE,
	false
)

centaur_double_edge_custom = class({})
centaur_double_edge_custom.talents = {}

function centaur_double_edge_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/centaur/double_edge.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_centaur/centaur_double_edge_body.vpcf", context)
	PrecacheResource("particle", "particles/centaur/edge_legendary_caster.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_lowhp_.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_rupture.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sven/sven_spell_gods_strength.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_proc.vpcf", context)
	PrecacheResource("particle", "particles/centaur/edge_shield.vpcf", context)
	PrecacheResource("particle", "particles/centaur/edge_stack.vpcf", context)
	PrecacheResource("particle", "particles/centaur/edge_pull_cast.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/centaur/centaur_2022_immortal/centaur_2022_immortal_stampede_cast.vpcf",
		context
	)
end

function centaur_double_edge_custom:CreateTalent()
	self:ToggleAutoCast()
	self.caster:AddNewModifier(self.caster, self, "modifier_centaur_double_edge_custom_silence_ready", {})
end

function centaur_double_edge_custom:UpdateTalents()
	local caster = self:GetCaster()

	if not self.init then
		self.init = true
		self.talents = {
			has_h2 = 0,
			h2_duration = caster:GetTalentValue("modifier_centaur_hero_2", "duration", true),
			h2_slow = 0,
			h2_move = 0,

			has_h4 = 0,
			h4_range = caster:GetTalentValue("modifier_centaur_hero_4", "range", true),
			h4_range_inc = caster:GetTalentValue("modifier_centaur_hero_4", "range_inc", true),
			h4_silence = caster:GetTalentValue("modifier_centaur_hero_4", "silence", true),
			h4_knock_duration = caster:GetTalentValue("modifier_centaur_hero_4", "knock_duration", true),
			h4_talent_cd = caster:GetTalentValue("modifier_centaur_hero_4", "talent_cd", true),

			w1_damage = 0,
			w1_damage_self = 0,

			w2_cd = 0,
			w2_cast = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_heal = 0,
			w3_chance = caster:GetTalentValue("modifier_centaur_edge_3", "chance", true),

			w7_cd_inc = caster:GetTalentValue("modifier_centaur_edge_7", "cd_inc", true) / 100,
			w7_damage = caster:GetTalentValue("modifier_centaur_edge_7", "damage", true) / 100,
			w7_blood_duration = caster:GetTalentValue("modifier_centaur_edge_7", "blood_duration", true),
			w7_duration = caster:GetTalentValue("modifier_centaur_edge_7", "duration", true),
			w7_interval = caster:GetTalentValue("modifier_centaur_edge_7", "interval", true),
		}
	end

	if caster:HasTalent("modifier_centaur_edge_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_centaur_edge_1", "damage") / 100
		self.talents.w1_damage_self = caster:GetTalentValue("modifier_centaur_edge_1", "damage_self") / 100
	end

	if caster:HasTalent("modifier_centaur_edge_2") then
		self.talents.w2_cd = caster:GetTalentValue("modifier_centaur_edge_2", "cd") / 100
		self.talents.w2_cast = caster:GetTalentValue("modifier_centaur_edge_2", "cast") / 100
	end

	if caster:HasTalent("modifier_centaur_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_move = caster:GetTalentValue("modifier_centaur_hero_2", "move")
		self.talents.h2_slow = caster:GetTalentValue("modifier_centaur_hero_2", "slow")
	end

	if caster:HasTalent("modifier_centaur_edge_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_centaur_edge_3", "damage") / 100
		self.talents.w3_heal = caster:GetTalentValue("modifier_centaur_edge_3", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_centaur_edge_3", type = 1, value = self.talents.w3_heal })
	end

	if caster:HasTalent("modifier_centaur_hero_4") then
		self.talents.has_h4 = 1
	end
end

function centaur_double_edge_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "centaur_double_edge", self)
end

function centaur_double_edge_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_centaur_double_edge_custom_tracker"
end

function centaur_double_edge_custom:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
		+ DOTA_ABILITY_BEHAVIOR_AOE
		+ (self.talents.has_h4 == 1 and DOTA_ABILITY_BEHAVIOR_AUTOCAST or 0)
end

function centaur_double_edge_custom:GetCooldown(level)
	local k = 1 + (self.talents.w2_cd or 0)
	if self.caster:HasModifier("modifier_centaur_double_edge_custom_legendary") then
		k = k * (1 + self.talents.w7_cd_inc)
	end
	return self.BaseClass.GetCooldown(self, level) * k
end

function centaur_double_edge_custom:GetAOERadius()
	return self.radius or 0
end

function centaur_double_edge_custom:GetCastRange(vLocation, hTarget)
	local bonus = 0
	if
		self.talents.has_h4 == 1
		and not self.caster:HasModifier("modifier_centaur_double_edge_custom_silence_cd")
		and self.caster:HasModifier("modifier_centaur_double_edge_custom_silence_ready")
	then
		bonus = self.talents.h4_range_inc
	end
	return self.BaseClass.GetCastRange(self, vLocation, hTarget) + bonus
end

function centaur_double_edge_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) * (1 + (self.talents.w2_cast or 0))
end

function centaur_double_edge_custom:OnAbilityPhaseStart()
	if not IsServer() then
		return
	end
	self.sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Centaur.DoubleEdge.Precast", self)
	local phase_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_centaur/centaur_double_edge_phase.vpcf",
		self
	)

	if phase_pfx ~= "particles/units/heroes/hero_centaur/centaur_double_edge_phase.vpcf" then
		local target = self:GetCursorTarget()
		self.pfx_start = ParticleManager:CreateParticle(phase_pfx, PATTACH_CUSTOMORIGIN, self.caster)
		ParticleManager:SetParticleControl(self.pfx_start, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(
			self.pfx_start,
			0,
			(target:GetOrigin() - self.caster:GetOrigin()):Normalized()
		)
		ParticleManager:SetParticleControl(self.pfx_start, 3, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(self.pfx_start, 4, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(self.pfx_start, 9, self.caster:GetAbsOrigin())
	end
	self.caster:EmitSound(self.sound)
	return true
end

function centaur_double_edge_custom:OnAbilityPhaseInterrupted()
	if not IsServer() then
		return
	end
	self.caster:StopSound(self.sound)
	if self.pfx_start then
		ParticleManager:DestroyParticle(self.pfx_start, false)
		ParticleManager:ReleaseParticleIndex(self.pfx_start)
	end
end

function centaur_double_edge_custom:OnSpellStart(new_target, auto, no_aoe)
	local target = self:GetCursorTarget()

	if new_target then
		target = new_target
	end

	if not auto and target:TriggerSpellAbsorb(self) then
		return
	end

	local point = target:GetAbsOrigin()
	local radius = self.radius
	local damage_base = self.edge_damage
	local damage_str = self.strength_damage

	local damage = damage_base + damage_str * self.caster:GetStrength() / 100
	if auto then
		damage = damage * self.talents.w3_damage
	end

	local legendary_mod = self.caster:FindModifierByName("modifier_centaur_double_edge_custom_legendary")
	if legendary_mod then
		legendary_mod:SetDuration(self.talents.w7_duration, true)
	end

	if not auto and IsValid(self.caster.stomp_ability) then
		self.caster.stomp_ability:ProcCd()
	end

	local targets = self.caster:FindTargets(radius, point)
	if not auto then
		table.insert(targets, self.caster)
	end

	local damageTable = { attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL }

	local proc_silence = false
	if
		self.talents.has_h4 == 1
		and not self.caster:HasModifier("modifier_centaur_double_edge_custom_silence_cd")
		and not auto
		and self:GetAutoCastState()
	then
		proc_silence = true
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_centaur_double_edge_custom_silence_cd",
			{ duration = self.talents.h4_talent_cd }
		)
	end

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_centaur/centaur_double_edge_body.vpcf",
		self
	)

	for _, aoe_target in pairs(targets) do
		if aoe_target == target or not no_aoe then
			damageTable.victim = aoe_target
			local real_damage = damage

			if aoe_target == self.caster then
				if target:IsCreep() then
					real_damage = real_damage * (1 + self.creeps_reduce)
				end
				real_damage = real_damage * (1 + self.talents.w1_damage_self)
				damageTable.damage_flags = DOTA_DAMAGE_FLAG_NON_LETHAL
			else
				real_damage = real_damage * (1 + self.talents.w1_damage)
				damageTable.damage_flags = 0

				if self.talents.has_h2 == 1 then
					aoe_target:AddNewModifier(
						self.caster,
						self,
						"modifier_centaur_double_edge_custom_slow",
						{ duration = self.talents.h2_duration }
					)
				end

				if IsValid(self.caster.stomp_ability) then
					self.caster.stomp_ability:ApplyReduce(aoe_target)
				end

				if proc_silence then
					self.caster:PullTarget(aoe_target, self, self.talents.h4_knock_duration)
					aoe_target:AddNewModifier(
						self.caster,
						self,
						"modifier_generic_silence",
						{ duration = (1 - aoe_target:GetStatusResistance()) * self.talents.h4_silence }
					)

					local chain_effect = ParticleManager:CreateParticle(
						"particles/centaur/edge_pull_cast.vpcf",
						PATTACH_CUSTOMORIGIN_FOLLOW,
						aoe_target
					)
					ParticleManager:SetParticleControlEnt(
						chain_effect,
						1,
						self.caster,
						PATTACH_POINT_FOLLOW,
						"attach_hitloc",
						self.caster:GetOrigin(),
						true
					)
					ParticleManager:SetParticleControlEnt(
						chain_effect,
						3,
						aoe_target,
						PATTACH_POINT_FOLLOW,
						"attach_hitloc",
						aoe_target:GetOrigin(),
						true
					)
					ParticleManager:ReleaseParticleIndex(chain_effect)
					aoe_target:EmitSound("Centaur.Edge_pull")
					aoe_target:EmitSound("Centaur.Edge_pull2")
				end
			end
			damageTable.damage = real_damage

			local particle = ParticleManager:CreateParticle(pfx_name, PATTACH_CUSTOMORIGIN_FOLLOW, aoe_target)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				aoe_target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				aoe_target:GetAbsOrigin(),
				true
			)
			if pfx_name ~= "particles/units/heroes/hero_centaur/centaur_double_edge_body.vpcf" then
				ParticleManager:SetParticleControlEnt(
					particle,
					1,
					aoe_target,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					aoe_target:GetAbsOrigin(),
					true
				)
				if aoe_target ~= self.caster then
					ParticleManager:SetParticleControl(particle, 2, Vector(8, 0, 0))
				end
				ParticleManager:SetParticleControl(particle, 3, aoe_target:GetAbsOrigin())
			end
			ParticleManager:ReleaseParticleIndex(particle)

			if aoe_target ~= self.caster and legendary_mod then
				aoe_target:AddNewModifier(
					self.caster,
					self,
					"modifier_centaur_double_edge_custom_legendary_blood",
					{ damage = real_damage * self.talents.w7_damage }
				)
			else
				DoDamage(damageTable, auto)
			end
		end
	end

	if not auto then
		self:ProcDouble(target)
	end

	local vec = (target:GetAbsOrigin() - self.caster:GetAbsOrigin()):Normalized()
	vec.z = 0

	local caster_unit = self.caster
	if auto then
		caster_unit = target
	end

	local sound_name = wearables_system:GetSoundReplacement(self.caster, "Hero_Centaur.DoubleEdge", self)
	local pfx_name =
		wearables_system:GetParticleReplacementAbility(self.caster, "particles/centaur/double_edge.vpcf", self)

	local particle_edge_fx = ParticleManager:CreateParticle(pfx_name, PATTACH_CUSTOMORIGIN_FOLLOW, caster_unit)
	ParticleManager:SetParticleControlEnt(
		particle_edge_fx,
		0,
		caster_unit,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		caster_unit:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle_edge_fx,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlForward(particle_edge_fx, 2, vec)
	if pfx_name ~= "particles/centaur/double_edge.vpcf" then
		ParticleManager:SetParticleControl(particle_edge_fx, 3, target:GetAbsOrigin())
	end
	ParticleManager:SetParticleControl(
		particle_edge_fx,
		5,
		self.caster:GetAttachmentOrigin(self.caster:ScriptLookupAttachment("attach_hitloc"))
	)
	ParticleManager:SetParticleControlForward(particle_edge_fx, 5, vec)
	if pfx_name ~= "particles/centaur/double_edge.vpcf" then
		ParticleManager:SetParticleControl(particle_edge_fx, 6, Vector(200, 0, 0))
	end
	ParticleManager:ReleaseParticleIndex(particle_edge_fx)

	target:EmitSound(sound_name)
end

function centaur_double_edge_custom:ProcDouble(target, no_random)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end

	if not no_random then
		if not RollPseudoRandomPercentage(self.talents.w3_chance, 7556, self.caster) then
			return
		end
	end

	Timers:CreateTimer(0.3, function()
		if IsValid(target) then
			self:OnSpellStart(target, "modifier_centaur_edge_3", no_random)
		end
	end)
end

modifier_centaur_double_edge_custom_tracker = class(mod_hidden)
function modifier_centaur_double_edge_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.double_edge_ability = self.ability

	self.legendary_ability = self.parent:FindAbilityByName("centaur_double_edge_custom_legendary")
	if IsValid(self.legendary_ability) then
		if IsServer() and not self.legendary_ability:IsTrained() then
			self.legendary_ability:SetLevel(1)
		end
		self.legendary_ability:UpdateTalents()
	end

	self.ability.edge_damage = self.ability:GetSpecialValueFor("edge_damage")
	self.ability.strength_damage = self.ability:GetSpecialValueFor("strength_damage")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.creeps_reduce = self.ability:GetSpecialValueFor("creeps_reduce") / 100
end

function modifier_centaur_double_edge_custom_tracker:OnRefresh()
	self.ability.edge_damage = self.ability:GetSpecialValueFor("edge_damage")
	self.ability.strength_damage = self.ability:GetSpecialValueFor("strength_damage")
end

function modifier_centaur_double_edge_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
	}
end

function modifier_centaur_double_edge_custom_tracker:GetModifierCastRangeBonusStacking()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_range
end

function modifier_centaur_double_edge_custom_tracker:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.h2_move
end

modifier_centaur_double_edge_custom_legendary_blood = class(mod_hidden)
function modifier_centaur_double_edge_custom_legendary_blood:GetStatusEffectName()
	return "particles/status_fx/status_effect_rupture.vpcf"
end
function modifier_centaur_double_edge_custom_legendary_blood:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_centaur_double_edge_custom_legendary_blood:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.duration = self.ability.talents.w7_blood_duration
	self.interval = self.ability.talents.w7_interval
	self.total_damage = 0
	self.ticks = self.duration / self.interval

	if not IsServer() then
		return
	end

	self.parent:GenericParticle("particles/bristleback/brist_proc.vpcf")

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_bloodseeker/bloodseeker_rupture.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(particle, false, false, -1, false, false)

	self:SetStackCount(self.ticks)
	self.RemoveForDuel = true
	self:AddDamage(table.damage)

	self.damageTable =
		{ victim = self.parent, attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self:StartIntervalThink(self.interval)
end

function modifier_centaur_double_edge_custom_legendary_blood:OnRefresh(table)
	if not IsServer() then
		return
	end
	self:AddDamage(table.damage)
end

function modifier_centaur_double_edge_custom_legendary_blood:AddDamage(damage)
	if not IsServer() then
		return
	end
	self:SetStackCount(self.ticks)
	self.total_damage = self.total_damage + damage
	self.tick_damage = self.total_damage / self.ticks
end

function modifier_centaur_double_edge_custom_legendary_blood:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.damageTable.damage = self.tick_damage
	self.total_damage = self.total_damage - self.tick_damage

	DoDamage(self.damageTable, "modifier_centaur_edge_7")

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
		return
	end
end

modifier_centaur_double_edge_custom_slow = class(mod_hidden)
function modifier_centaur_double_edge_custom_slow:IsPurgable()
	return true
end
function modifier_centaur_double_edge_custom_slow:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.slow = self.ability.talents.h2_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
	self.parent:EmitSound("DOTA_Item.Maim")
end

function modifier_centaur_double_edge_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_centaur_double_edge_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_centaur_double_edge_custom_silence_cd = class(mod_cd)
function modifier_centaur_double_edge_custom_silence_cd:GetTexture()
	return "buffs/centaur/edge_4"
end

modifier_centaur_double_edge_custom_silence_ready = class(mod_visible)
function modifier_centaur_double_edge_custom_silence_ready:IsHidden()
	return self.parent:HasModifier("modifier_centaur_double_edge_custom_silence_cd")
end
function modifier_centaur_double_edge_custom_silence_ready:RemoveOnDeath()
	return false
end
function modifier_centaur_double_edge_custom_silence_ready:GetTexture()
	return "buffs/centaur/edge_4"
end
function modifier_centaur_double_edge_custom_silence_ready:OnCreated()
	self.parent = self:GetParent()
end

centaur_double_edge_custom_legendary = class({})
centaur_double_edge_custom_legendary.talents = {}

function centaur_double_edge_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

function centaur_double_edge_custom_legendary:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_w7 = 0,
			w7_talent_cd = caster:GetTalentValue("modifier_centaur_edge_7", "talent_cd", true),
			w7_duration = caster:GetTalentValue("modifier_centaur_edge_7", "duration", true),
		}
	end

	if caster:HasTalent("modifier_centaur_edge_7") then
		self.talents.has_w7 = 1
	end
end

function centaur_double_edge_custom_legendary:GetCooldown()
	return self.talents.w7_talent_cd or 0
end

function centaur_double_edge_custom_legendary:OnSpellStart()
	self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_4)
	self.caster:EmitSound("Centaur.Edge_legendary_cast1")
	self.caster:EmitSound("Centaur.Edge_legendary_cast2")
	self.caster:EmitSound("Centaur.Edge_legendary_cast3")
	self.caster:GenericParticle(
		"particles/econ/items/centaur/centaur_2022_immortal/centaur_2022_immortal_stampede_cast.vpcf"
	)
	self.caster:GenericParticle("particles/units/heroes/hero_sven/sven_spell_gods_strength.vpcf")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_centaur_double_edge_custom_legendary",
		{ duration = self.talents.w7_duration }
	)
end

modifier_centaur_double_edge_custom_legendary = class(mod_visible)
function modifier_centaur_double_edge_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_beserkers_call.vpcf"
end
function modifier_centaur_double_edge_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_centaur_double_edge_custom_legendary:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.ability:EndCd()

	local particle = ParticleManager:CreateParticle(
		"particles/centaur/edge_legendary_caster.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(particle, false, false, -1, false, false)

	self.max_time = self:GetRemainingTime()

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_centaur_double_edge_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = self:GetRemainingTime(),
		use_zero = 1,
		style = "CentaurEdge",
	})
end

function modifier_centaur_double_edge_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "CentaurEdge" })
end

function modifier_centaur_double_edge_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_centaur_double_edge_custom_legendary:GetModifierModelScale()
	return 25
end