--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom_speed",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom_armor",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom_max",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom_legendary",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom_legendary_damage",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom_legendary_timer",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom_bkb_cd",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_troll_warlord_fervor_custom_stun_cd",
	"abilities/troll_warlord/troll_warlord_fervor_custom",
	LUA_MODIFIER_MOTION_NONE
)

troll_warlord_fervor_custom = class({})

function troll_warlord_fervor_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_unleash_pulse.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/ogre_magi/ogre_ti8_immortal_weapon/ogre_ti8_immortal_bloodlust_buff_hands_glow.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_troll_warlord/troll_warlord_rampage.vpcf", context)
	PrecacheResource("particle", "particles/troll_warlord/troll_fervor_buf.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/troll_warlord/troll_warlord_ti7_axe/troll_ti7_axe_bash_explosion.vpcf",
		context
	)
	PrecacheResource("particle", "particles/legion_commander/lc_lowhp.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/status_effect_jugg_arcana_v2_omni.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_troll_warlord/troll_warlord_rampage_resistance_buff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/troll_warlord/fervor_crit.vpcf", context)
end

function troll_warlord_fervor_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_troll_warlord_fervor_custom"
end

function troll_warlord_fervor_custom:GetCooldown(level)
	if self:GetCaster():HasTalent("modifier_troll_fervor_legendary") then
		return self:GetCaster():GetTalentValue("modifier_troll_fervor_legendary", "cd")
	end
	return 0
end

function troll_warlord_fervor_custom:GetBehavior()
	if self:GetCaster():HasTalent("modifier_troll_fervor_legendary") then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function troll_warlord_fervor_custom:OnSpellStart()
	local caster = self:GetCaster()

	caster:RemoveModifierByName("modifier_troll_warlord_fervor_custom_legendary_damage")
	caster:AddNewModifier(
		caster,
		self,
		"modifier_troll_warlord_fervor_custom_legendary",
		{ duration = caster:GetTalentValue("modifier_troll_fervor_legendary", "duration") }
	)
end

modifier_troll_warlord_fervor_custom_legendary = class({})
function modifier_troll_warlord_fervor_custom_legendary:IsHidden()
	return true
end
function modifier_troll_warlord_fervor_custom_legendary:IsPurgable()
	return false
end
function modifier_troll_warlord_fervor_custom_legendary:GetStatusEffectName()
	return "particles/econ/items/juggernaut/jugg_arcana/status_effect_jugg_arcana_v2_omni.vpcf"
end
function modifier_troll_warlord_fervor_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_troll_warlord_fervor_custom_legendary:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true

	self.ability:EndCd()

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_troll_warlord_fervor_custom_legendary_timer",
		{ duration = self.parent:GetTalentValue("modifier_troll_fervor_legendary", "timer") }
	)

	self.parent:GenericParticle("particles/units/heroes/hero_troll_warlord/troll_warlord_rampage.vpcf")
	self.parent:GenericParticle("particles/troll_warlord/troll_fervor_buf.vpcf", self, true)
	self.parent:GenericParticle(
		"particles/units/heroes/hero_troll_warlord/troll_warlord_rampage_resistance_buff.vpcf",
		self
	)

	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_4)

	self.parent:EmitSound("Troll.Fervor_legendary")
	self.parent:EmitSound("Troll.Fervor_legendary_alt")
	self.parent:EmitSound("Troll.Fervor_voice")

	self.max_time = self:GetRemainingTime()
	self.ended = false

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_troll_warlord_fervor_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.parent:HasModifier("modifier_troll_warlord_fervor_custom_legendary_timer") then
		self.parent:EmitSound("Troll.Fervor_legendary_stun")
		self.parent:GenericParticle(
			"particles/econ/items/troll_warlord/troll_warlord_ti7_axe/troll_ti7_axe_bash_explosion.vpcf",
			nil,
			true
		)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_stunned",
			{
				duration = self.parent:GetTalentValue("modifier_troll_fervor_legendary", "stun")
					* (1 - self.parent:GetStatusResistance()),
			}
		)

		self:Destroy()
	end

	if self.ended == true then
		return
	end

	local stack = 0
	local mod = self.parent:FindModifierByName("modifier_troll_warlord_fervor_custom_legendary_damage")
	if mod then
		stack = mod:GetStackCount()
	end

	self.parent:UpdateUIshort({
		max_time = self.max_time,
		time = self:GetRemainingTime(),
		stack = stack,
		style = "TrollFervor",
	})
end

function modifier_troll_warlord_fervor_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability:StartCd()
	self.ended = true
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "TrollFervor" })
end

modifier_troll_warlord_fervor_custom_legendary_timer = class({})
function modifier_troll_warlord_fervor_custom_legendary_timer:IsHidden()
	return true
end
function modifier_troll_warlord_fervor_custom_legendary_timer:IsPurgable()
	return false
end

modifier_troll_warlord_fervor_custom_legendary_damage = class({})
function modifier_troll_warlord_fervor_custom_legendary_damage:IsHidden()
	return false
end
function modifier_troll_warlord_fervor_custom_legendary_damage:IsPurgable()
	return false
end
function modifier_troll_warlord_fervor_custom_legendary_damage:GetEffectName()
	return "particles/legion_commander/lc_lowhp.vpcf"
end
function modifier_troll_warlord_fervor_custom_legendary_damage:GetTexture()
	return "buffs/warpath_lowhp"
end
function modifier_troll_warlord_fervor_custom_legendary_damage:OnCreated(table)
	self.damage = self:GetCaster():GetTalentValue("modifier_troll_fervor_legendary", "damage")
	if not IsServer() then
		return
	end
	self:SetStackCount(1)
end

function modifier_troll_warlord_fervor_custom_legendary_damage:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()
end

function modifier_troll_warlord_fervor_custom_legendary_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_troll_warlord_fervor_custom_legendary_damage:GetModifierPreAttack_BonusDamage()
	return self.damage * self:GetStackCount()
end

function modifier_troll_warlord_fervor_custom_legendary_damage:GetModifierModelScale()
	return math.min(30, self:GetStackCount() * 1.5)
end

modifier_troll_warlord_fervor_custom = class({})

function modifier_troll_warlord_fervor_custom:IsPurgable()
	return false
end
function modifier_troll_warlord_fervor_custom:RemoveOnDeath()
	return false
end
function modifier_troll_warlord_fervor_custom:IsHidden()
	return true
end

function modifier_troll_warlord_fervor_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability:GetSpecialValueFor("duration")
	self.max = self.ability:GetSpecialValueFor("max_stacks")
	self.bonus_duration = 0

	self.crit_chance = 0

	self.more_move = self.parent:GetTalentValue("modifier_troll_fervor_1", "bonus", true)

	self.armor_duration = self.parent:GetTalentValue("modifier_troll_fervor_3", "duration", true)

	self.legendary_linger = self.parent:GetTalentValue("modifier_troll_fervor_legendary", "linger", true)
	self.legendary_timer = self.parent:GetTalentValue("modifier_troll_fervor_legendary", "timer", true)

	self.stun_cd = self.parent:GetTalentValue("modifier_troll_fervor_4", "cd", true)
	self.crit_heal = self.parent:GetTalentValue("modifier_troll_fervor_4", "heal", true) / 100
	self.crit_heal_creeps = self.parent:GetTalentValue("modifier_troll_fervor_4", "creeps", true)
	self.crit_stun = self.parent:GetTalentValue("modifier_troll_fervor_4", "stun", true)

	self.records = {}

	if not IsServer() then
		return
	end

	self:SetHasCustomTransmitterData(true)
	self:UpdateTalent()
	self.parent:AddRecordDestroyEvent(self)
	self.parent:AddAttackEvent_out(self)
end

function modifier_troll_warlord_fervor_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_troll_warlord_fervor_custom:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	if not self.records[params.record] then
		return
	end
	self.records[params.record] = nil
end

function modifier_troll_warlord_fervor_custom:GetCritChance()
	if not self.parent:HasTalent("modifier_troll_fervor_4") then
		return 0
	end
	local mod = self.parent:FindModifierByName("modifier_troll_warlord_fervor_custom_speed")
	if not mod then
		return 0
	end
	return mod:GetStackCount() * self.crit_chance
end

function modifier_troll_warlord_fervor_custom:GetCritDamage()
	if not self.parent:HasTalent("modifier_troll_fervor_4") then
		return
	end
	return self.crit_damage
end

function modifier_troll_warlord_fervor_custom:GetModifierPreAttack_CriticalStrike(params)
	if not self.parent:HasTalent("modifier_troll_fervor_4") then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	if not self.parent:HasModifier("modifier_troll_warlord_fervor_custom_speed") then
		return
	end
	if not RollPseudoRandomPercentage(self:GetCritChance(), 3519, self.parent) then
		return
	end

	self.records[params.record] = true

	return self:GetCritDamage()
end

function modifier_troll_warlord_fervor_custom:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if not self.parent:HasTalent("modifier_troll_fervor_4") then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.record then
		return
	end
	if not self.records[params.record] then
		return
	end

	local unit = params.unit

	unit:EmitSound("Troll.Fervor_crit")

	if self.parent:CheckLifesteal(params) then
		local heal = params.damage * self.crit_heal
		if unit:IsCreep() then
			heal = heal / self.crit_heal_creeps
		end
		self.parent:GenericHeal(heal, self.ability, nil, nil, "modifier_troll_fervor_4")
	end

	local hit_effect =
		ParticleManager:CreateParticle("particles/troll_warlord/fervor_crit.vpcf", PATTACH_CUSTOMORIGIN, unit)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		unit,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		unit:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		unit,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		unit:GetAbsOrigin(),
		false
	)
	ParticleManager:Delete(hit_effect, 1)

	if not unit:HasModifier("modifier_troll_warlord_fervor_custom_stun_cd") then
		local stun_pfx = wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/generic_gameplay/generic_minibash.vpcf",
			self
		)
		if stun_pfx ~= "particles/generic_gameplay/generic_minibash.vpcf" then
			local immortal_particle = ParticleManager:CreateParticle(stun_pfx, PATTACH_OVERHEAD_FOLLOW, unit)
			ParticleManager:SetParticleControl(immortal_particle, 0, unit:GetAbsOrigin())
			ParticleManager:SetParticleControl(immortal_particle, 1, self.parent:GetAbsOrigin())
			ParticleManager:Delete(immortal_particle, 1)
		end
		unit:EmitSound("Troll.Fervor_stun")
		unit:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_troll_warlord_fervor_custom_stun_cd",
			{ duration = self.stun_cd }
		)
		unit:AddNewModifier(
			self.parent,
			self.parent:BkbAbility(self.ability, true),
			"modifier_bashed",
			{ duration = self.crit_stun * (1 - unit:GetStatusResistance()) }
		)
	end
end

function modifier_troll_warlord_fervor_custom:GetModifierMoveSpeedBonus_Percentage()
	local bonus = self.move_bonus
	if self.parent:GetUpgradeStack("modifier_troll_warlord_fervor_custom_speed") >= self.max then
		bonus = bonus * self.more_move
	end
	return bonus
end

function modifier_troll_warlord_fervor_custom:GetModifierStatusResistanceStacking()
	local bonus = self.status_bonus
	if self.parent:GetUpgradeStack("modifier_troll_warlord_fervor_custom_speed") >= self.max then
		bonus = bonus * self.more_move
	end
	return bonus
end

function modifier_troll_warlord_fervor_custom:UpdateTalent(name)
	self.move_bonus = self.parent:GetTalentValue("modifier_troll_fervor_1", "move")
	self.status_bonus = self.parent:GetTalentValue("modifier_troll_fervor_1", "status")

	self.parent:AddPercentStat({ str = self.parent:GetTalentValue("modifier_troll_fervor_5", "str") / 100 }, self)

	self.crit_chance = self.parent:GetTalentValue("modifier_troll_fervor_4", "chance")
	self.crit_damage = self.parent:GetTalentValue("modifier_troll_fervor_4", "crit")

	self.bonus_duration = self.parent:GetTalentValue("modifier_troll_fervor_6", "duration")

	if name == "modifier_troll_fervor_4" or self.parent:HasTalent("modifier_troll_fervor_4") then
		self.parent:AddDamageEvent_out(self)
	end

	if name == "modifier_troll_fervor_legendary" or self.parent:HasTalent("modifier_troll_fervor_legendary") then
		self.parent:AddAttackStartEvent_out(self)
		self:StartIntervalThink(1)
	end

	self:SendBuffRefreshToClients()
end

function modifier_troll_warlord_fervor_custom:AddCustomTransmitterData()
	return {
		status_bonus = self.status_bonus,
		move_bonus = self.move_bonus,
	}
end

function modifier_troll_warlord_fervor_custom:HandleCustomTransmitterData(data)
	self.status_bonus = data.status_bonus
	self.move_bonus = data.move_bonus
end

function modifier_troll_warlord_fervor_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not self.parent:HasTalent("modifier_troll_fervor_legendary") then
		return
	end

	if
		not self.parent:HasModifier("modifier_troll_warlord_fervor_custom_legendary") and not self.ability:IsActivated()
	then
		self.ability:StartCd()
	end
end

function modifier_troll_warlord_fervor_custom:AttackStartEvent_out(params)
	if not self.parent:HasTalent("modifier_troll_fervor_legendary") then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.no_attack_cooldown then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if not self.parent:HasModifier("modifier_troll_warlord_fervor_custom_legendary") then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_troll_warlord_fervor_custom_legendary_damage",
		{ duration = self.legendary_linger }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_troll_warlord_fervor_custom_legendary_timer",
		{ duration = self.legendary_timer }
	)
end

function modifier_troll_warlord_fervor_custom:AttackEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.no_attack_cooldown then
		return
	end

	if
		self.parent == params.attacker
		or (not params.attacker:IsRealHero() and params.attacker:HasAbility(self.ability:GetName()))
	then
		local ability = params.attacker:FindAbilityByName(self.ability:GetName())
		params.attacker:AddNewModifier(
			params.attacker,
			ability,
			"modifier_troll_warlord_fervor_custom_speed",
			{ target = params.target:entindex(), duration = self.duration + self.bonus_duration }
		)
	end

	if params.attacker ~= self.parent then
		return
	end

	if self.parent:HasTalent("modifier_troll_fervor_3") then
		params.target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_troll_warlord_fervor_custom_armor",
			{ duration = self.armor_duration }
		)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_troll_warlord_fervor_custom_armor",
			{ duration = self.armor_duration }
		)
	end
end

modifier_troll_warlord_fervor_custom_speed = class({})
function modifier_troll_warlord_fervor_custom_speed:IsPurgable()
	return false
end
function modifier_troll_warlord_fervor_custom_speed:IsHidden()
	return self:GetStackCount() == 0
end
function modifier_troll_warlord_fervor_custom_speed:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.bkb_duration = self.parent:GetTalentValue("modifier_troll_fervor_5", "bkb", true)
	self.bkb_cd = self.parent:GetTalentValue("modifier_troll_fervor_5", "cd", true)

	self.cd_items = self.parent:GetTalentValue("modifier_troll_fervor_6", "cd_items", true)

	self.stack_multiplier = self.ability:GetSpecialValueFor("attack_speed")
		+ self.caster:GetTalentValue("modifier_troll_fervor_2", "speed")
	self.max_stacks = self.ability:GetSpecialValueFor("max_stacks")

	if not IsServer() then
		return
	end

	self.parent:RemoveModifierByName("modifier_troll_warlord_fervor_custom_max")

	self.str_bonus = self.parent:GetTalentValue("modifier_troll_fervor_5", "str", true) / 100

	self.RemoveForDuel = true

	local stack = 0
	if self.parent:HasTalent("modifier_troll_fervor_2") then
		stack = self.caster:GetTalentValue("modifier_troll_fervor_2", "stack") - 1
	end

	self:SetStackCount(stack)
	self.currentTarget = table.target
end

function modifier_troll_warlord_fervor_custom_speed:OnRefresh(table)
	if not IsServer() then
		return
	end

	if self.currentTarget ~= table.target then
		self:OnCreated(table)
	else
		self:MoreStack()
	end
end

function modifier_troll_warlord_fervor_custom_speed:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_troll_warlord_fervor_custom_max")
end

function modifier_troll_warlord_fervor_custom_speed:MoreStack()
	if not IsServer() then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end

	if self:GetStackCount() < self.max_stacks then
		self:IncrementStackCount()
	end

	if self:GetStackCount() >= self.max_stacks then
		if self.parent:HasTalent("modifier_troll_fervor_5") then
			self.parent:AddPercentStat({ str = self.str_bonus }, self)

			if not self.parent:HasModifier("modifier_troll_warlord_fervor_custom_bkb_cd") then
				self.parent:EmitSound("BS.Bloodrite_purge")
				self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_troll_warlord_fervor_custom_bkb_cd",
					{ duration = self.bkb_cd }
				)
				self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_generic_debuff_immune",
					{ effect = 1, duration = self.bkb_duration }
				)
			end
		end

		if self.parent:HasTalent("modifier_troll_fervor_6") then
			if not self.parent:HasModifier("modifier_troll_warlord_fervor_custom_max") then
				self.parent:AddNewModifier(self.parent, self.ability, "modifier_troll_warlord_fervor_custom_max", {})
			end
		end
	end
end

function modifier_troll_warlord_fervor_custom_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_troll_warlord_fervor_custom_speed:GetModifierAttackSpeedBonus_Constant()
	return self:GetStackCount() * self.stack_multiplier
end

modifier_troll_warlord_fervor_custom_bkb_cd = class({})
function modifier_troll_warlord_fervor_custom_bkb_cd:IsHidden()
	return false
end
function modifier_troll_warlord_fervor_custom_bkb_cd:IsPurgable()
	return false
end
function modifier_troll_warlord_fervor_custom_bkb_cd:RemoveOnDeath()
	return false
end
function modifier_troll_warlord_fervor_custom_bkb_cd:IsDebuff()
	return true
end
function modifier_troll_warlord_fervor_custom_bkb_cd:GetTexture()
	return "buffs/berserker_lowhp"
end
function modifier_troll_warlord_fervor_custom_bkb_cd:OnCreated()
	self.RemoveForDuel = true
end

modifier_troll_warlord_fervor_custom_armor = class({})
function modifier_troll_warlord_fervor_custom_armor:IsPurgable()
	return false
end
function modifier_troll_warlord_fervor_custom_armor:IsHidden()
	return false
end
function modifier_troll_warlord_fervor_custom_armor:GetTexture()
	return "buffs/fervor_armor"
end
function modifier_troll_warlord_fervor_custom_armor:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.max = self.caster:GetTalentValue("modifier_troll_fervor_3", "max")
	self.armor = self.caster:GetTalentValue("modifier_troll_fervor_3", "armor")

	if self.caster ~= self.parent then
		self.armor = self.armor * -1
	end

	if not IsServer() then
		return
	end
	self:SetStackCount(1)
end

function modifier_troll_warlord_fervor_custom_armor:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_troll_warlord_fervor_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_troll_warlord_fervor_custom_armor:GetModifierPhysicalArmorBonus()
	return self:GetStackCount() * self.armor
end

modifier_troll_warlord_fervor_custom_max = class({})
function modifier_troll_warlord_fervor_custom_max:IsHidden()
	return true
end
function modifier_troll_warlord_fervor_custom_max:IsPurgable()
	return false
end
function modifier_troll_warlord_fervor_custom_max:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	local cd_inc = self.parent:GetTalentValue("modifier_troll_fervor_6", "cd_items")

	for i = 0, 8 do
		local current_item = self.parent:GetItemInSlot(i)

		if current_item and not NoCdItems[current_item:GetName()] then
			local cooldown_mod = self.parent:AddNewModifier(
				self.parent,
				self:GetAbility(),
				"modifier_cooldown_speed",
				{
					ability = current_item:entindex(),
					is_item = true,
					cd_inc = cd_inc,
					talent = "modifier_troll_fervor_6",
				}
			)
			local name = self:GetName()

			cooldown_mod:SetEndRule(function()
				return self.parent:HasModifier(name)
			end)
		end
	end

	self.parent:EmitSound("Troll.Fervor_max")
	self.parent:GenericParticle("particles/units/heroes/hero_ogre_magi/ogre_magi_bloodlust_buff.vpcf", self)

	self.effect_impact = ParticleManager:CreateParticle(
		"particles/econ/items/ogre_magi/ogre_ti8_immortal_weapon/ogre_ti8_immortal_bloodlust_buff_hands_glow.vpcf",
		PATTACH_CUSTOMORIGIN,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.effect_impact,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.effect_impact, false, false, -1, false, false)
end

modifier_troll_warlord_fervor_custom_stun_cd = class({})
function modifier_troll_warlord_fervor_custom_stun_cd:IsHidden()
	return true
end
function modifier_troll_warlord_fervor_custom_stun_cd:IsPurgable()
	return false
end