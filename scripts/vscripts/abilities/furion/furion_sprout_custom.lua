--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_furion_sprout_custom", "abilities/furion/furion_sprout_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_furion_sprout_custom_aura",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_legendary",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_legendary_treant",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_legendary_leash",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_legendary_effect",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_sprout_7"
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_tracker",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_sprout_4"
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_caster",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_furion_hero_4", "modifier_furion_sprout_2" }
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_leash",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_hero_4"
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_resist",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_furion_sprout_3"
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_resist_bonus",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_furion_sprout_3" }
)
LinkLuaModifier(
	"modifier_furion_sprout_custom_delay",
	"abilities/furion/furion_sprout_custom",
	LUA_MODIFIER_MOTION_NONE
)

furion_sprout_custom = class({})
furion_sprout_custom.talents = {}

function furion_sprout_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_sprout.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_sprout_damage_aoe.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_sprout_damage.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_curse_of_forest_cast.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_aoe.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_aoe_border.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/treant_protector/ti7_shoulder/treant_ti7_livingarmor.vpcf",
		context
	)
	PrecacheResource("particle", "particles/nature_prophet/sprout_treant_death.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_leash.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_hit.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_natures_prophet_curse.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_enchantress_shard_debuff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_delay.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/teleport_knock.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/heavens_halberd.vpcf", context)
	PrecacheResource("particle", "particles/nature_prophet/sprout_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_scurry_aura.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_furion/furion_arboreal_might_buff.vpcf", context)
	PrecacheResource("particle", "particles/muerta/resist_stackb.vpcf", context)
	PrecacheResource(
		"model",
		"models/items/furion/treant/the_ancient_guardian_the_ancient_treants/the_ancient_guardian_the_ancient_treants.vmdl",
		context
	)
end

function furion_sprout_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_cd = 0,
			q1_base = 0,
			q1_damage = 0,

			q2_regen = 0,
			q2_heal = 0,
			q2_bonus = caster:GetTalentValue("modifier_furion_sprout_2", "bonus", true),

			has_q3 = 0,
			q3_magic = 0,
			q3_damage = 0,
			q3_aoe_radius = caster:GetTalentValue("modifier_furion_sprout_3", "aoe_radius", true),
			q3_bonus = caster:GetTalentValue("modifier_furion_sprout_3", "bonus", true),
			q3_radius = caster:GetTalentValue("modifier_furion_sprout_3", "radius", true),
			q3_delay = caster:GetTalentValue("modifier_furion_sprout_3", "delay", true),
			q3_duration = caster:GetTalentValue("modifier_furion_sprout_3", "duration", true),

			has_q4 = 0,
			q4_str = caster:GetTalentValue("modifier_furion_sprout_4", "str", true),
			q4_max = caster:GetTalentValue("modifier_furion_sprout_4", "max", true),
			q4_radius = caster:GetTalentValue("modifier_furion_sprout_4", "radius", true),
			q4_duration = caster:GetTalentValue("modifier_furion_sprout_4", "duration", true),
			q4_damage_reduce = caster:GetTalentValue("modifier_furion_sprout_4", "damage_reduce", true),

			has_h4 = 0,
			h4_move = caster:GetTalentValue("modifier_furion_hero_4", "move", true),
			h4_leash = caster:GetTalentValue("modifier_furion_hero_4", "leash", true),
		}
	end

	if caster:HasTalent("modifier_furion_sprout_1") then
		self.talents.has_q1 = 1
		self.talents.q1_cd = caster:GetTalentValue("modifier_furion_sprout_1", "cd")
		self.talents.q1_base = caster:GetTalentValue("modifier_furion_sprout_1", "base")
		self.talents.q1_damage = caster:GetTalentValue("modifier_furion_sprout_1", "damage") / 100
	end

	if caster:HasTalent("modifier_furion_sprout_2") then
		self.talents.q2_regen = caster:GetTalentValue("modifier_furion_sprout_2", "regen")
		self.talents.q2_heal = caster:GetTalentValue("modifier_furion_sprout_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_furion_sprout_2",
			type = 1,
			value = function()
				return self.talents.q2_heal
					* (caster:HasModifier("modifier_furion_sprout_custom_caster") and self.talents.q2_bonus or 1)
			end,
		})
	end

	if caster:HasTalent("modifier_furion_sprout_3") then
		self.talents.has_q3 = 1
		self.talents.q3_magic = caster:GetTalentValue("modifier_furion_sprout_3", "magic")
		self.talents.q3_damage = caster:GetTalentValue("modifier_furion_sprout_3", "damage") / 100
	end

	if caster:HasTalent("modifier_furion_sprout_4") then
		self.talents.has_q4 = 1
		if IsServer() and not self.q4_init and IsValid(self.tracker) then
			self.q4_init = true
			self.tracker:StartIntervalThink(0.5)
		end
	end

	if caster:HasTalent("modifier_furion_hero_4") then
		self.talents.has_h4 = 1
	end
end

function furion_sprout_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_furion_sprout_custom_tracker"
end

function furion_sprout_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q1_cd or 0)
end

function furion_sprout_custom:GetAOERadius()
	return self.radius or 0
end

function furion_sprout_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	if target and target:TriggerSpellAbsorb(self) then
		return
	end

	local duration = self.duration + (self.talents.has_q4 == 1 and self.talents.q4_duration or 0)
	local vTargetPosition = target and target:GetAbsOrigin() or self:GetCursorPosition()

	local nFXIndex = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_furion/furion_sprout.vpcf",
		PATTACH_CUSTOMORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(nFXIndex, 0, vTargetPosition)
	ParticleManager:SetParticleControl(nFXIndex, 1, Vector(0.0, self.radius, 0.0))
	ParticleManager:ReleaseParticleIndex(nFXIndex)

	for i = 1, self.tree_count do
		local angel = (math.pi / 2 + 2 * math.pi / self.tree_count * i)
		local abs = GetGroundPosition(vTargetPosition + Vector(math.cos(angel), math.sin(angel), 0) * self.radius, nil)
		local tree = CreateTempTree(abs, duration)
		tree.is_tree = true
	end

	for i = 1, self.tree_count do
		local angel = (math.pi / 2 + 2 * math.pi / self.tree_count * i)
		local abs = GetGroundPosition(vTargetPosition + Vector(math.cos(angel), math.sin(angel), 0) * self.radius, nil)
		ResolveNPCPositions(abs, 64)
	end

	if IsValid(self.tracker) then
		self.tracker:OnIntervalThink()
	end

	AddFOWViewer(self.caster:GetTeamNumber(), vTargetPosition, self.vision_range, duration, false)
	EmitSoundOnLocationWithCaster(vTargetPosition, "Hero_Furion.Sprout", self.caster)

	self.caster:AddNewModifier(self.caster, self, "modifier_furion_sprout_custom_caster", { duration = duration })
	CreateModifierThinker(
		self.caster,
		self,
		"modifier_furion_sprout_custom",
		{ duration = duration + 0.2 },
		vTargetPosition,
		self.caster:GetTeamNumber(),
		false
	)

	if self.talents.has_q3 == 1 then
		CreateModifierThinker(
			self.caster,
			self,
			"modifier_furion_sprout_custom_delay",
			{ duration = self.talents.q3_delay },
			vTargetPosition,
			self.caster:GetTeamNumber(),
			false
		)
	end
end

function furion_sprout_custom:GetDamage()
	return self.sprout_damage + self.talents.q1_base + self.talents.q1_damage * self.caster:GetMaxHealth()
end

modifier_furion_sprout_custom = class(mod_hidden)
function modifier_furion_sprout_custom:IsAura()
	return true
end
function modifier_furion_sprout_custom:GetModifierAura()
	return "modifier_furion_sprout_custom_aura"
end
function modifier_furion_sprout_custom:GetAuraRadius()
	return self.radius
end
function modifier_furion_sprout_custom:GetAuraDuration()
	return 0.1
end
function modifier_furion_sprout_custom:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_furion_sprout_custom:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_furion_sprout_custom:OnCreated(params)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.point = self.parent:GetAbsOrigin()
	self.radius = self.ability.sprout_damage_radius

	local particle = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_furion/furion_sprout_damage_aoe.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, self.point)
	ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 0, 0))
	self:AddParticle(particle, false, false, -1, false, false)

	self.damageTable = { ability = self.ability, attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL }

	for _, target in pairs(self.caster:FindTargets(self.radius, self.point)) do
		self.damageTable.victim = target
		self.damageTable.damage = self.ability:GetDamage(target)
		DoDamage(self.damageTable)

		if self.ability.talents.has_h4 == 1 then
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_furion_sprout_custom_leash",
				{ duration = self.ability.talents.h4_leash }
			)
		end
	end

	self.ability:EndCd()
end

function modifier_furion_sprout_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()
end

modifier_furion_sprout_custom_aura = class(mod_hidden)
function modifier_furion_sprout_custom_aura:GetEffectName()
	return "particles/units/heroes/hero_furion/furion_sprout_damage.vpcf"
end
function modifier_furion_sprout_custom_aura:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_furion_sprout_custom_aura:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.damageTable =
		{ ability = self.ability, victim = self.parent, attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL }

	if self.ability.talents.has_q4 == 1 then
		self.parent:GenericParticle("particles/items2_fx/heavens_halberd.vpcf", self, true)
	end

	self.interval = 0.5
	self:StartIntervalThink(self.interval)
end

function modifier_furion_sprout_custom_aura:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.damageTable.damage = self.ability:GetDamage(self.parent) * self.ability.sprout_damage_dot * self.interval
	DoDamage(self.damageTable)

	if self.parent:IsRealHero() and self.caster:GetQuest() == "Furion.Quest_5" and not self.caster:QuestCompleted() then
		self.caster:UpdateQuest(self.interval)
	end
end

function modifier_furion_sprout_custom_aura:GetStatusEffectName()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return "particles/status_fx/status_effect_enchantress_shard_debuff.vpcf"
end

function modifier_furion_sprout_custom_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_furion_sprout_custom_aura:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_damage_reduce
end

function modifier_furion_sprout_custom_aura:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_damage_reduce
end

modifier_furion_sprout_custom_caster = class(mod_visible)
function modifier_furion_sprout_custom_caster:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	if self.ability.talents.has_h4 == 1 then
		self.parent:GenericParticle("particles/units/heroes/hero_hoodwink/hoodwink_scurry_aura.vpcf", self)
	end
end

function modifier_furion_sprout_custom_caster:CheckState()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_ALLOW_PATHING_THROUGH_TREES] = true,
	}
end

function modifier_furion_sprout_custom_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_furion_sprout_custom_caster:GetModifierMoveSpeedBonus_Percentage()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_move
end

function modifier_furion_sprout_custom_caster:GetModifierHealthRegenPercentage()
	return self.ability.talents.q2_regen
end

modifier_furion_sprout_custom_leash = class(mod_hidden)
function modifier_furion_sprout_custom_leash:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_furion_sprout_custom_tracker = class(mod_hidden)
function modifier_furion_sprout_custom_tracker:IsHidden()
	return self.ability.talents.has_q4 == 0
end
function modifier_furion_sprout_custom_tracker:GetTexture()
	return "buffs/furion/sprout_4"
end
function modifier_furion_sprout_custom_tracker:IsAura()
	return IsServer() and self.parent:IsAlive() and self.ability.talents.has_q3 == 1
end
function modifier_furion_sprout_custom_tracker:GetModifierAura()
	return "modifier_furion_sprout_custom_resist"
end
function modifier_furion_sprout_custom_tracker:GetAuraRadius()
	return self.ability.talents.q3_radius
end
function modifier_furion_sprout_custom_tracker:GetAuraDuration()
	return 1
end
function modifier_furion_sprout_custom_tracker:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_furion_sprout_custom_tracker:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_furion_sprout_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.sprout_ability = self.ability

	self.parent.sprout_legendary = self.parent:FindAbilityByName("furion_sprout_custom_legendary")
	if self.parent.sprout_legendary then
		self.parent.sprout_legendary:UpdateTalents()
	end

	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.tree_count = self.ability:GetSpecialValueFor("tree_count")
	self.ability.vision_range = self.ability:GetSpecialValueFor("vision_range")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.sprout_damage = self.ability:GetSpecialValueFor("sprout_damage")
	self.ability.sprout_damage_dot = self.ability:GetSpecialValueFor("sprout_damage_dot") / 100
	self.ability.sprout_damage_radius = self.ability:GetSpecialValueFor("sprout_damage_radius")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
end

function modifier_furion_sprout_custom_tracker:OnRefresh()
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.sprout_damage = self.ability:GetSpecialValueFor("sprout_damage")
end

function modifier_furion_sprout_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q4 == 0 then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local count = #GridNav:GetAllTreesAroundPoint(self.parent:GetOrigin(), self.ability.talents.q4_radius, false)

	self.treants = self.parent:FindFriends(self.ability.talents.q4_radius, nil, nil, DOTA_UNIT_TARGET_FLAG_INVULNERABLE)
	for _, treant in pairs(self.treants) do
		if treant.is_treant and treant.owner and treant.owner == self.parent then
			count = count + 1
		end
	end

	local stack = math.min(self.ability.talents.q4_max, count)
	if stack ~= self:GetStackCount() then
		self:SetStackCount(stack)
		self.parent:AddPercentStat({ str = stack * self.ability.talents.q4_str / 100 }, self)
		if stack == 0 then
			self.parent:CalculateStatBonus(true)
		end
	end
end

function modifier_furion_sprout_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_furion_sprout_custom_tracker:OnTooltip()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_str * self:GetStackCount()
end

modifier_furion_sprout_custom_delay = class(mod_hidden)
function modifier_furion_sprout_custom_delay:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.point = self.parent:GetAbsOrigin()
	self.radius = self.ability.talents.q3_aoe_radius
	self.time = self:GetRemainingTime()

	self.damageTable = { ability = self.ability, attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL }

	self.particle = ParticleManager:CreateParticle(
		"particles/nature_prophet/sprout_delay.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.radius, 0, -self.radius / self.time))
	ParticleManager:SetParticleControl(self.particle, 2, Vector(self.time, 0, 0))
	self:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_furion_sprout_custom_delay:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:EmitSound("Furion.Sprout_delay_damage")
	self.parent:EmitSound("Furion.Sprout_delay_damage2")

	local particle_knock =
		ParticleManager:CreateParticle("particles/nature_prophet/teleport_knock.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle_knock, 0, self.point)
	ParticleManager:SetParticleControl(particle_knock, 2, Vector(self.radius, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle_knock)

	for _, target in pairs(self.caster:FindTargets(self.radius, self.point)) do
		target:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_furion_sprout_custom_resist_bonus",
			{ duration = self.ability.talents.q3_duration }
		)

		local hit_effect =
			ParticleManager:CreateParticle("particles/nature_prophet/sprout_hit.vpcf", PATTACH_CUSTOMORIGIN, target)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			0,
			target,
			PATTACH_POINT,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:SetParticleControlEnt(
			hit_effect,
			1,
			target,
			PATTACH_POINT,
			"attach_hitloc",
			target:GetAbsOrigin(),
			false
		)
		ParticleManager:ReleaseParticleIndex(hit_effect)

		self.damageTable.victim = target
		self.damageTable.damage = self.ability:GetDamage(target) * self.ability.talents.q3_damage
		DoDamage(self.damageTable, "modifier_furion_sprout_3")
	end
end

modifier_furion_sprout_custom_resist = class(mod_hidden)
function modifier_furion_sprout_custom_resist:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.magic = self.ability.talents.q3_magic
	self.bonus = self.ability.talents.q3_bonus
end

function modifier_furion_sprout_custom_resist:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_furion_sprout_custom_resist:GetModifierMagicalResistanceBonus()
	return self.magic * (self.parent:HasModifier("modifier_furion_sprout_custom_resist_bonus") and self.bonus or 1)
end

modifier_furion_sprout_custom_resist_bonus = class(mod_hidden)
function modifier_furion_sprout_custom_resist_bonus:GetEffectName()
	return "particles/muerta/resist_stackb.vpcf"
end
function modifier_furion_sprout_custom_resist_bonus:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end

furion_sprout_custom_legendary = class({})
furion_sprout_custom_legendary.talents = {}

function furion_sprout_custom_legendary:CreateTalent()
	self:SetHidden(false)
end

function furion_sprout_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q7 = 0,
			q7_health = caster:GetTalentValue("modifier_furion_sprout_7", "health", true) / 100,
			q7_radius = caster:GetTalentValue("modifier_furion_sprout_7", "radius", true),
			q7_knock_duration = caster:GetTalentValue("modifier_furion_sprout_7", "knock_duration", true),
			q7_base = caster:GetTalentValue("modifier_furion_sprout_7", "base", true),
			q7_talent_cd = caster:GetTalentValue("modifier_furion_sprout_7", "talent_cd", true),
			q7_armor = caster:GetTalentValue("modifier_furion_sprout_7", "armor", true),
			q7_magic = caster:GetTalentValue("modifier_furion_sprout_7", "magic", true),
			q7_damage_inc = caster:GetTalentValue("modifier_furion_sprout_7", "damage_inc", true) / 100,
			q7_trees = caster:GetTalentValue("modifier_furion_sprout_7", "trees", true),
			q7_duration = caster:GetTalentValue("modifier_furion_sprout_7", "duration", true),
			q7_damage = caster:GetTalentValue("modifier_furion_sprout_7", "damage", true) / 100,
			q7_heal = caster:GetTalentValue("modifier_furion_sprout_7", "heal", true) / 100,
		}
	end

	if caster:HasTalent("modifier_furion_sprout_7") then
		self.talents.has_q7 = 1
	end
end

function furion_sprout_custom_legendary:GetAOERadius()
	return self.talents.q7_radius or 0
end

function furion_sprout_custom_legendary:GetCooldown()
	return self.talents.q7_talent_cd or 0
end

function furion_sprout_custom_legendary:OnSpellStart()
	local vTargetPosition = self:GetCursorPosition()

	EmitSoundOnLocationWithCaster(vTargetPosition, "Hero_Furion.CurseOfTheForest.Cast", self.caster)
	EmitSoundOnLocationWithCaster(vTargetPosition, "Furion.legendary_cast", self.caster)

	local nFXIndex = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_furion/furion_curse_of_forest_cast.vpcf",
		PATTACH_CUSTOMORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(nFXIndex, 0, vTargetPosition)
	ParticleManager:SetParticleControl(nFXIndex, 1, Vector(self.talents.q7_radius * 1.1, 0, 0))
	ParticleManager:ReleaseParticleIndex(nFXIndex)

	CreateModifierThinker(
		self.caster,
		self,
		"modifier_furion_sprout_custom_legendary",
		{ duration = self.talents.q7_duration },
		vTargetPosition,
		self.caster:GetTeamNumber(),
		false
	)
end

modifier_furion_sprout_custom_legendary = class(mod_hidden)
function modifier_furion_sprout_custom_legendary:IsAura()
	return true
end
function modifier_furion_sprout_custom_legendary:GetModifierAura()
	return "modifier_furion_sprout_custom_legendary_effect"
end
function modifier_furion_sprout_custom_legendary:GetAuraRadius()
	return self.ability.talents.q7_radius
end
function modifier_furion_sprout_custom_legendary:GetAuraDuration()
	return 1
end
function modifier_furion_sprout_custom_legendary:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_furion_sprout_custom_legendary:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
end
function modifier_furion_sprout_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.point = self.parent:GetAbsOrigin()
	self.sprout = self.caster.sprout_ability

	self.ability:EndCd()

	self.parent:EmitSound("Furion.legendary_loop")
	self.parent:EmitSound("Furion.legendary_loop2")

	self.time = self:GetRemainingTime()
	self.damage = self.ability.talents.q7_damage
	self.damage_inc = self.ability.talents.q7_damage_inc

	self.radius = self.ability.talents.q7_radius
	local health = self.ability.talents.q7_base + self.ability.talents.q7_health * self.caster:GetMaxHealth()

	local max = self.ability.talents.q7_trees
	for i = 1, max do
		local angel = (math.pi / 2 + 2 * math.pi / max * i)

		local abs =
			GetGroundPosition(self.point + Vector(math.cos(angel), math.sin(angel), 0) * self.radius * 0.85, nil)
		local tree = CreateTempTree(abs, self.time)
		tree.is_tree = true
		ResolveNPCPositions(abs, 64)
	end

	self.treant = CreateUnitByName(
		"npc_dota_furion_treant_custom_legendary",
		self.point,
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	self.treant:AddNewModifier(self.caster, self.ability, "modifier_kill", { duration = self.time })
	self.treant.owner = self.caster

	self.treant:AddNewModifier(self.caster, self.ability, "modifier_furion_sprout_custom_legendary_treant", {})

	self.treant:SetOwner(nil)

	self.treant:SetBaseMaxHealth(health)
	self.treant:SetMaxHealth(health)
	self.treant:SetHealth(health)
	self.treant:SetPhysicalArmorBaseValue(self.ability.talents.q7_armor)
	self.treant:SetBaseMagicalResistanceValue(self.ability.talents.q7_magic)

	self.treant:FacePoint(self.treant:GetAbsOrigin() + Vector(0, -1, 0))

	AddFOWViewer(self.caster:GetTeamNumber(), self.point, self.radius * 1.2, self.time + 2, false)

	self.particle = ParticleManager:CreateParticle("particles/nature_prophet/sprout_aoe.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.particle, 0, self.point)
	ParticleManager:SetParticleControl(self.particle, 1, Vector(self.radius, 0, 0))
	ParticleManager:SetParticleControl(self.particle, 3, Vector(1, 0, 0))
	self:AddParticle(self.particle, false, false, -1, false, false)

	self.border =
		ParticleManager:CreateParticle("particles/nature_prophet/sprout_aoe_border.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(self.border, 0, self.point)
	ParticleManager:SetParticleControl(self.border, 1, Vector(self.radius, 0, 0))
	ParticleManager:SetParticleControl(self.border, 2, Vector(self.time, 0, 0))
	self:AddParticle(self.border, false, false, -1, false, false)

	self.targets = {}
	self.interval = FrameTime() * 2
	self.damage_interval = 0.5

	self.damageTable = { ability = self.ability, attacker = self.caster, damage_type = DAMAGE_TYPE_MAGICAL }

	self.caster:CheckCd("furion_q7_damage_inc", 1)

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_furion_sprout_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.caster:UpdateUIshort({
		max_time = self.time,
		time = self:GetRemainingTime(),
		stack = math.floor(self.damage * 100) .. "%",
		style = "FurionSprout",
	})

	local has_treant = IsValid(self.treant) and self.treant:IsAlive()
	local do_damage = self.caster:CheckCd("furion_q7_damage", self.damage_interval)

	for _, target in pairs(self.caster:FindTargets(self.radius, self.point)) do
		if do_damage and IsValid(self.sprout) then
			self.damageTable.victim = target
			self.damageTable.damage = self.sprout:GetDamage()
				* self.damage
				* self.damage_interval
				* self.sprout:GetCreepsMult(target)
			DoDamage(self.damageTable, "modifier_furion_sprout_7")
		end

		if not self.targets[target] and has_treant then
			self.targets[target] = true
			target:AddNewModifier(
				self.caster,
				self.ability,
				"modifier_furion_sprout_custom_legendary_leash",
				{
					treant = self.treant:entindex(),
					duration = self:GetRemainingTime(),
					x = self.point.x,
					y = self.point.y,
				}
			)
		end
	end

	if self.caster:CheckCd("furion_q7_damage_inc", 1) then
		self.damage = self.damage * (1 + self.damage_inc)
	end

	if not has_treant and self.border then
		ParticleManager:DestroyParticle(self.border, true)
		ParticleManager:ReleaseParticleIndex(self.border)
		self.border = nil
	end
end

function modifier_furion_sprout_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability:StartCd()

	self.parent:StopSound("Furion.legendary_loop")
	self.parent:StopSound("Furion.legendary_loop2")

	self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "FurionSprout" })
end

modifier_furion_sprout_custom_legendary_treant = class(mod_hidden)
function modifier_furion_sprout_custom_legendary_treant:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.parent:SetModel(
		"models/items/furion/treant/the_ancient_guardian_the_ancient_treants/the_ancient_guardian_the_ancient_treants.vmdl"
	)
	self.parent:SetOriginalModel(
		"models/items/furion/treant/the_ancient_guardian_the_ancient_treants/the_ancient_guardian_the_ancient_treants.vmdl"
	)

	local particle = ParticleManager:CreateParticle(
		"particles/econ/items/treant_protector/ti7_shoulder/treant_ti7_livingarmor.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetOrigin())
	ParticleManager:SetParticleControl(particle, 1, self.parent:GetOrigin())
	self:AddParticle(particle, false, false, -1, false, false)

	self.caster:AddHealEvent_inc(self, true)
end

function modifier_furion_sprout_custom_legendary_treant:HealEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.caster ~= params.unit then
		return
	end
	if not self.caster:IsAlive() then
		return
	end

	self.parent:GenericHeal(params.gain * self.ability.talents.q7_heal, self.ability, true, "")
end

function modifier_furion_sprout_custom_legendary_treant:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED] = true,
	}
end

function modifier_furion_sprout_custom_legendary_treant:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Hero_Furion.TreantDeath")
	self.parent:EmitSound("Furion.legendary_end")
	self.parent:AddNoDraw()

	local particle =
		ParticleManager:CreateParticle("particles/nature_prophet/sprout_treant_death.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin() + Vector(0, 0, 40))
	ParticleManager:ReleaseParticleIndex(particle)
end

modifier_furion_sprout_custom_legendary_leash = class(mod_hidden)
function modifier_furion_sprout_custom_legendary_leash:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true

	self.radius = self.ability.talents.q7_radius
	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.treant = EntIndexToHScript(table.treant)
	self.parent:EmitSound("Furion.WrathOfNature_root_start")
	self.parent:EmitSound("Furion.WrathOfNature_root_start2")

	self.knock_dist = self.radius * 0.5
	self.knockback_duration = self.ability.talents.q7_knock_duration

	local effect_cast =
		ParticleManager:CreateParticle("particles/nature_prophet/sprout_leash.vpcf", PATTACH_ABSORIGIN, self.parent)
	ParticleManager:SetParticleControl(effect_cast, 0, self.point)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(effect_cast, false, false, -1, false, false)

	self:OnIntervalThink()
	self:StartIntervalThink(FrameTime())
end

function modifier_furion_sprout_custom_legendary_leash:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not IsValid(self.treant) or not self.treant:IsAlive() then
		self:Destroy()
		return
	end

	if self.parent:IsCurrentlyHorizontalMotionControlled() or self.parent:IsCurrentlyVerticalMotionControlled() then
		return
	end
	if self.parent:IsInvulnerable() or self.parent:IsOutOfGame() then
		return
	end
	if (self.parent:GetAbsOrigin() - self.point):Length2D() <= self.radius then
		return
	end

	self.parent:EmitSound("Furion.Sprout_knock")

	self.treant:RemoveGesture(ACT_DOTA_ATTACK)
	self.treant:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 1.4)

	local hit_effect =
		ParticleManager:CreateParticle("particles/nature_prophet/sprout_hit.vpcf", PATTACH_CUSTOMORIGIN, self.parent)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		self.parent,
		PATTACH_POINT,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		self.parent,
		PATTACH_POINT,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	local dir = (self.treant:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
	local point = self.treant:GetAbsOrigin() - dir * self.knock_dist

	local distance = (point - self.parent:GetAbsOrigin()):Length2D()
	distance = math.max(100, distance)
	point = self.parent:GetAbsOrigin() + dir * distance

	self.parent:AddNewModifier(self.caster, self.caster:BkbAbility(self.ability, true), "modifier_generic_arc", {
		target_x = point.x,
		target_y = point.y,
		distance = distance,
		duration = self.knockback_duration,
		height = 0,
		fix_end = false,
		isStun = true,
		activity = ACT_DOTA_FLAIL,
	})
end

modifier_furion_sprout_custom_legendary_effect = class(mod_hidden)
function modifier_furion_sprout_custom_legendary_effect:GetEffectName()
	return "particles/units/heroes/hero_furion/furion_sprout_damage.vpcf"
end
function modifier_furion_sprout_custom_legendary_effect:GetStatusEffectName()
	return "particles/status_fx/status_effect_natures_prophet_curse.vpcf"
end
function modifier_furion_sprout_custom_legendary_effect:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end