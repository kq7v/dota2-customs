--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_lina_laguna_blade_custom",
	"abilities/lina/lina_laguna_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_laguna_blade_custom_slow",
	"abilities/lina/lina_laguna_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_laguna_blade_custom_legendary_stack",
	"abilities/lina/lina_laguna_blade_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_laguna_7"
)
LinkLuaModifier(
	"modifier_lina_laguna_blade_custom_legendary_haste",
	"abilities/lina/lina_laguna_blade_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_laguna_7"
)
LinkLuaModifier(
	"modifier_lina_laguna_blade_custom_tracker",
	"abilities/lina/lina_laguna_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_laguna_blade_custom_heal_reduce",
	"abilities/lina/lina_laguna_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_lina_laguna_blade_custom_damage",
	"abilities/lina/lina_laguna_blade_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_lina_laguna_3" }
)
LinkLuaModifier(
	"modifier_lina_laguna_blade_custom_shield_cd",
	"abilities/lina/lina_laguna_blade_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_lina_laguna_4"
)

lina_laguna_blade_custom = class({})
lina_laguna_blade_custom.talents = {}

function lina_laguna_blade_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_spell_laguna_blade.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_spell_laguna_blade_shard_scorch.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_lina/lina_spell_laguna_blade_shard_units_hit.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_snapfire/hero_snapfire_ultimate_calldown.vpcf", context)
	PrecacheResource("particle", "particles/generic_gameplay/rune_doubledamage_owner.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_mjollnir_shield.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/chain_lightning.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/gleipnir_root.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_supercharge_buff.vpcf", context)
	PrecacheResource("particle", "particles/lina/laguna_legendary_stack.vpcf", context)
	PrecacheResource("particle", "particles/lina/soul_attack.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/maiden_mark.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf",
		context
	)
	PrecacheResource("particle", "particles/lina/laguna_delay_damage.vpcf", context)
	PrecacheResource("particle", "particles/lina/laguna_legendary_radius.vpcf", context)
	PrecacheResource("particle", "particles/lina/laguna_legendary.vpcf", context)
	PrecacheResource("particle", "particles/zeus/wrath_legendary_refresh.vpcf", context)
	PrecacheResource("particle", "particles/lina/array_shield.vpcf", context)
end

function lina_laguna_blade_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_spell = 0,
			r1_damage = 0,

			has_r2 = 0,
			r2_heal_reduce = 0,
			r2_heal = 0,
			r2_duration = caster:GetTalentValue("modifier_lina_laguna_2", "duration", true),

			has_r3 = 0,
			r3_damage = 0,
			r3_damage_type = caster:GetTalentValue("modifier_lina_laguna_3", "damage_type", true),
			r3_delay = caster:GetTalentValue("modifier_lina_laguna_3", "delay", true),
			r3_max = caster:GetTalentValue("modifier_lina_laguna_3", "max", true),

			has_r4 = 0,
			r4_chance = caster:GetTalentValue("modifier_lina_laguna_4", "chance", true),
			r4_cast = caster:GetTalentValue("modifier_lina_laguna_4", "cast", true),
			r4_slow_resist = caster:GetTalentValue("modifier_lina_laguna_4", "slow_resist", true),
			r4_shield = caster:GetTalentValue("modifier_lina_laguna_4", "shield", true) / 100,
			r4_shield_duration = caster:GetTalentValue("modifier_lina_laguna_4", "shield_duration", true),
			r4_talent_cd = caster:GetTalentValue("modifier_lina_laguna_4", "talent_cd", true),

			has_r7 = 0,
			r7_turn = caster:GetTalentValue("modifier_lina_laguna_7", "turn", true),
			r7_damage_inc = caster:GetTalentValue("modifier_lina_laguna_7", "damage_inc", true) / 100,
			r7_move = caster:GetTalentValue("modifier_lina_laguna_7", "move", true),
			r7_damage = caster:GetTalentValue("modifier_lina_laguna_7", "damage", true) / 100,
			r7_duration = caster:GetTalentValue("modifier_lina_laguna_7", "duration", true),
			r7_stack_duration = caster:GetTalentValue("modifier_lina_laguna_7", "stack_duration", true),
			r7_distance = caster:GetTalentValue("modifier_lina_laguna_7", "distance", true),
			r7_max = caster:GetTalentValue("modifier_lina_laguna_7", "max", true),
			r7_radius = caster:GetTalentValue("modifier_lina_laguna_7", "radius", true),
			r7_aoe = caster:GetTalentValue("modifier_lina_laguna_7", "aoe", true),
			r7_move_max = caster:GetTalentValue("modifier_lina_laguna_7", "move_max", true),
		}
	end

	if caster:HasTalent("modifier_lina_laguna_1") then
		self.talents.has_r1 = 1
		self.talents.r1_spell = caster:GetTalentValue("modifier_lina_laguna_1", "spell")
		self.talents.r1_damage = caster:GetTalentValue("modifier_lina_laguna_1", "damage") / 100
	end

	if caster:HasTalent("modifier_lina_laguna_2") then
		self.talents.has_r2 = 1
		self.talents.r2_heal_reduce = caster:GetTalentValue("modifier_lina_laguna_2", "heal_reduce")
		self.talents.r2_heal = caster:GetTalentValue("modifier_lina_laguna_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_lina_laguna_2", type = 1, value = self.talents.r2_heal })
	end

	if caster:HasTalent("modifier_lina_laguna_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_lina_laguna_3", "damage") / 100
	end

	if caster:HasTalent("modifier_lina_laguna_4") then
		self.talents.has_r4 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_lina_laguna_7") then
		self.talents.has_r7 = 1
		if IsServer() and not self.r7_init then
			self.r7_init = true
			caster:AddSpellEvent(self.tracker, true)
			self.tracker:OnIntervalThink()
		end
	end
end

function lina_laguna_blade_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "lina_laguna_blade", self)
end

function lina_laguna_blade_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_lina_laguna_blade_custom_tracker"
end

function lina_laguna_blade_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.caster:HasShard() and (self.shard_cd or 0) or 0)
end

function lina_laguna_blade_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) + (self.talents.has_r4 == 1 and self.talents.r4_cast or 0)
end

function lina_laguna_blade_custom:GetAOERadius()
	return (self.aoe or 0)
end

function lina_laguna_blade_custom:GetDamage()
	return self.damage + self.caster:GetMaxHealth() * self.talents.r1_damage
end

function lina_laguna_blade_custom:OnSpellStart()
	local target = self:GetCursorTarget()
	local laguna_sound = wearables_system:GetSoundReplacement(self.caster, "Ability.LagunaBlade", self)
	local laguna_particle = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_lina/lina_spell_laguna_blade.vpcf",
		self
	)

	self.caster:EmitSound(laguna_sound)

	local particle = ParticleManager:CreateParticle(laguna_particle, PATTACH_CUSTOMORIGIN, nil)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	if IsValid(self.caster.lina_scepter) and self.caster.lina_scepter:GetCooldownTimeRemaining() > 0 then
		self.caster.lina_scepter:EndCooldown()

		local particle = ParticleManager:CreateParticle(
			"particles/zeus/wrath_legendary_refresh.vpcf",
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
	end

	if target:TriggerSpellAbsorb(self) then
		return
	end

	if self.caster:HasShard() then
		local vec = (target:GetAbsOrigin() - self.caster:GetAbsOrigin())
		vec.z = 0

		local distance = vec:Length2D()
		vec = vec:Normalized()

		local dist_k = math.min(1, (1 - distance / 700))
		distance = 50 + dist_k * (self.shard_knock - 50)

		target:AddNewModifier(self.caster, self, "modifier_generic_knockback", {
			direction_x = vec.x,
			direction_y = vec.y,
			distance = distance,
			height = 0,
			duration = self.shard_knock_duration,
			IsStun = false,
			IsFlail = true,
		})
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_generic_debuff_immune",
			{ duration = self.shard_bkb, effect = 2, sound = 1 }
		)
	end

	local impact_sound = wearables_system:GetSoundReplacement(self.caster, "Ability.LagunaBladeImpact", self)
	target:EmitSound(impact_sound)

	for _, aoe_target in pairs(self.caster:FindTargets(self.aoe, target:GetAbsOrigin())) do
		aoe_target:AddNewModifier(
			self.caster,
			self,
			"modifier_lina_laguna_blade_custom",
			{ duration = self.damage_delay }
		)
	end
end

function lina_laguna_blade_custom:ApplyReduce(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_r2 == 0 then
		return
	end
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_lina_laguna_blade_custom_heal_reduce",
		{ duration = self.talents.r2_duration }
	)
end

modifier_lina_laguna_blade_custom = class(mod_hidden)
function modifier_lina_laguna_blade_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_lina_laguna_blade_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end
	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_lina/lina_spell_laguna_blade_shard_units_hit.vpcf",
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
	ParticleManager:SetParticleControl(particle, 1, self.caster:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	if self.ability.talents.has_r3 == 1 then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_lina_laguna_blade_custom_damage",
			{ duration = self.ability.talents.r3_delay }
		)
	end
end

function modifier_lina_laguna_blade_custom:OnDestroy()
	if not IsServer() then
		return
	end

	local damage = self.ability:GetDamage()
	local mod = self.parent:FindModifierByName("modifier_lina_laguna_blade_custom_legendary_stack")
	if mod then
		damage = damage * (1 + mod:GetStackCount() * self.ability.talents.r7_damage_inc)
		mod:Destroy()
	end

	if self.caster:GetQuest() == "Lina.Quest_7" and self.parent:IsRealHero() and not self.caster:QuestCompleted() then
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_lina_fiery_soul_custom_quest",
			{ duration = self.caster.quest.number }
		)
	end

	if IsValid(self.caster.lina_innate) then
		self.caster.lina_innate:ApplyBurn(self.parent, damage)
	end

	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_lina_laguna_blade_custom_slow",
		{ duration = self.ability.slow_duration }
	)

	DoDamage({
		victim = self.parent,
		attacker = self.caster,
		damage = damage,
		damage_type = DAMAGE_TYPE_MAGICAL,
		ability = self.ability,
	})
end

modifier_lina_laguna_blade_custom_tracker = class(mod_hidden)
function modifier_lina_laguna_blade_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.laguna_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.damage_delay = self.ability:GetSpecialValueFor("damage_delay")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
	self.ability.shard_cd = self.ability:GetSpecialValueFor("shard_cd")
	self.ability.shard_bkb = self.ability:GetSpecialValueFor("shard_bkb")
	self.ability.shard_knock = self.ability:GetSpecialValueFor("shard_knock")
	self.ability.shard_knock_duration = self.ability:GetSpecialValueFor("shard_knock_duration")
	self.ability.aoe = self.ability:GetSpecialValueFor("aoe")
end

function modifier_lina_laguna_blade_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
end

function modifier_lina_laguna_blade_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end

	if not self.pos or not self.dist then
		self.dist = 0
		self.pos = self.parent:GetAbsOrigin()
	end

	local pos = self.parent:GetAbsOrigin()
	local dist = (pos - self.pos):Length2D()

	self.dist = self.dist + dist
	self.pos = pos

	if
		self.dist >= self.ability.talents.r7_distance
		and not self.parent:HasModifier("modifier_lina_scepter_custom_blink")
	then
		self.dist = 0
		local target = self.parent:RandomTarget(self.ability.talents.r7_radius)
		if target and self.parent:IsAlive() then
			local point = target:GetAbsOrigin()
			if not self.radius_visual then
				self.radius_visual = ParticleManager:CreateParticleForPlayer(
					"particles/lina/laguna_legendary_radius.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					self.parent,
					self.parent:GetPlayerOwner()
				)
				ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
				ParticleManager:SetParticleControl(self.radius_visual, 1, Vector(self.ability.talents.r7_radius, 0, 0))
				self:AddParticle(self.radius_visual, false, false, -1, false, false)
			end

			local particle =
				ParticleManager:CreateParticle("particles/lina/laguna_legendary.vpcf", PATTACH_CUSTOMORIGIN, target)
			ParticleManager:SetParticleControlEnt(
				particle,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_attack1",
				self.parent:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				1,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle)

			target:EmitSound("Lina.Laguna_legendary")
			local damage = self.ability:GetDamage() * self.ability.talents.r7_damage

			for _, enemy in pairs(self.parent:FindTargets(self.ability.talents.r7_aoe, point)) do
				enemy:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_lina_laguna_blade_custom_legendary_stack",
					{ duration = self.ability.talents.r7_stack_duration }
				)
				DoDamage(
					{
						victim = enemy,
						attacker = self.parent,
						ability = self.ability,
						damage = damage,
						damage_type = DAMAGE_TYPE_MAGICAL,
					},
					"modifier_lina_laguna_7"
				)
			end
		elseif self.radius_visual then
			ParticleManager:DestroyParticle(self.radius_visual, false)
			ParticleManager:ReleaseParticleIndex(self.radius_visual)
			self.radius_visual = nil
		end
	end

	self:StartIntervalThink(0.2)
end

function modifier_lina_laguna_blade_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if params.ability:IsItem() then
		return
	end

	if self.ability.talents.has_r7 == 1 then
		self.parent:RemoveModifierByName("modifier_lina_laguna_blade_custom_legendary_haste")
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_lina_laguna_blade_custom_legendary_haste",
			{ duration = self.ability.talents.r7_duration }
		)
	end

	if self.ability.talents.has_r4 == 0 then
		return
	end

	local result = false
	if
		IsValid(self.parent.dragon_ability)
		and self.parent.dragon_ability == params.ability
		and not IsValid(self.ability.shield_mod)
		and not self.parent:HasModifier("modifier_lina_laguna_blade_custom_shield_cd")
		and RollPseudoRandomPercentage(self.ability.talents.r4_chance, 9451, self.parent)
	then
		result = true
	elseif params.ability == self.ability then
		result = true
	end

	if not result then
		return
	end

	if IsValid(self.ability.shield_mod) then
		self.ability.shield_mod:Destroy()
	end

	self.ability.shield_mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_generic_shield", {
		duration = self.ability.talents.r4_shield_duration,
		max_shield = self.parent:GetMaxHealth() * self.ability.talents.r4_shield,
		shield_talent = "modifier_lina_laguna_4",
		start_full = 1,
	})

	if self.ability.shield_mod then
		self.parent:EmitSound("Lina.Laguna_shield")
		self.particle =
			ParticleManager:CreateParticle("particles/lina/array_shield.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControlEnt(
			self.particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		self.ability.shield_mod:AddParticle(self.particle, false, false, -1, false, false)

		self.ability.shield_mod:SetEndFunction(function()
			if IsValid(self.parent) then
				self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_lina_laguna_blade_custom_shield_cd",
					{ duration = self.ability.talents.r4_talent_cd }
				)
			end
		end)
	end
end

function modifier_lina_laguna_blade_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_TURN_RATE_PERCENTAGE,
	}
end

function modifier_lina_laguna_blade_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.r1_spell
end

function modifier_lina_laguna_blade_custom_tracker:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_slow_resist
end

function modifier_lina_laguna_blade_custom_tracker:GetModifierTurnRate_Percentage()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	return self.ability.talents.r7_turn
end

modifier_lina_laguna_blade_custom_heal_reduce = class(mod_hidden)
function modifier_lina_laguna_blade_custom_heal_reduce:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.heal_reduce = self.ability.talents.r2_heal_reduce
end

function modifier_lina_laguna_blade_custom_heal_reduce:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_lina_laguna_blade_custom_heal_reduce:GetModifierHealChange()
	return self.heal_reduce
end

function modifier_lina_laguna_blade_custom_heal_reduce:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce
end

modifier_lina_laguna_blade_custom_slow = class(mod_hidden)
function modifier_lina_laguna_blade_custom_slow:IsPurgable()
	return true
end
function modifier_lina_laguna_blade_custom_slow:GetEffectName()
	return "particles/units/heroes/hero_zuus/zuus_shard_slow.vpcf"
end
function modifier_lina_laguna_blade_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.slow = self.ability.slow
end

function modifier_lina_laguna_blade_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_lina_laguna_blade_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_lina_laguna_blade_custom_damage = class(mod_visible)
function modifier_lina_laguna_blade_custom_damage:GetTexture()
	return "buffs/lina/laguna_3"
end
function modifier_lina_laguna_blade_custom_damage:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/crystal_maiden/maiden_mark.vpcf", self, true)
	self.parent:AddDamageEvent_inc(self, true)
end

function modifier_lina_laguna_blade_custom_damage:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.caster ~= params.attacker then
		return
	end

	self:SetStackCount(self:GetStackCount() + params.original_damage * self.ability.talents.r3_damage)
end

function modifier_lina_laguna_blade_custom_damage:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self:GetStackCount() <= 0 then
		return
	end

	local particle =
		ParticleManager:CreateParticle("particles/lina/laguna_delay_damage.vpcf", PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:EmitSound("Lina.Laguna_delay_damage")

	for i = 1, 2 do
		self.parent:GenericParticle("particles/econ/items/zeus/zeus_immortal_2021/zeus_immortal_2021_static_field.vpcf")
	end

	local real_damage = DoDamage(
		{
			victim = self.parent,
			attacker = self.caster,
			ability = self.ability,
			damage_type = self.ability.talents.r3_damage_type,
			damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
			damage = self:GetStackCount(),
		},
		"modifier_lina_laguna_3"
	)
	self.parent:SendNumber(105, real_damage)
end

modifier_lina_laguna_blade_custom_legendary_haste = class(mod_visible)
function modifier_lina_laguna_blade_custom_legendary_haste:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move = self.ability.talents.r7_move
	self.move_max = self.ability.talents.r7_move_max
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/econ/events/fall_2022/phase_boots/phase_boots_fall_2022.vpcf", self)
end

function modifier_lina_laguna_blade_custom_legendary_haste:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_lina_laguna_blade_custom_legendary_haste:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
	}
end

function modifier_lina_laguna_blade_custom_legendary_haste:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_lina_laguna_blade_custom_legendary_haste:GetModifierIgnoreMovespeedLimit()
	return 1
end

function modifier_lina_laguna_blade_custom_legendary_haste:GetModifierMoveSpeed_Max()
	return self.move_max
end

function modifier_lina_laguna_blade_custom_legendary_haste:GetModifierMoveSpeed_Limit()
	return self.move_max
end

modifier_lina_laguna_blade_custom_legendary_stack = class(mod_visible)
function modifier_lina_laguna_blade_custom_legendary_stack:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true

	self.particle = self.parent:GenericParticle("particles/lina/laguna_legendary_stack.vpcf", self, true)
	self:OnRefresh()
end

function modifier_lina_laguna_blade_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.ability.talents.r7_max then
		return
	end
	self:IncrementStackCount()

	local number_1 = self:GetStackCount()
	local double = math.floor(number_1 / 10)
	local number_2 = number_1 - double * 10

	ParticleManager:SetParticleControl(self.particle, 1, Vector(double, number_1, number_2))
end

modifier_lina_laguna_blade_custom_shield_cd = class(mod_cd)
function modifier_lina_laguna_blade_custom_shield_cd:GetTexture()
	return "buffs/lina/laguna_4"
end