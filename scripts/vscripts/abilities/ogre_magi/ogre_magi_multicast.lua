--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_ogre_magi_multicast_custom",
	"abilities/ogre_magi/ogre_magi_multicast",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_multicast_custom_cast",
	"abilities/ogre_magi/ogre_magi_multicast",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_multicast_custom_legendary",
	"abilities/ogre_magi/ogre_magi_multicast",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_multi_7"
)
LinkLuaModifier(
	"modifier_ogre_magi_multicast_custom_legendary_status",
	"abilities/ogre_magi/ogre_magi_multicast",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_ogre_magi_multicast_custom_heal",
	"abilities/ogre_magi/ogre_magi_multicast",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_multi_2"
)
LinkLuaModifier(
	"modifier_ogre_magi_multicast_custom_fire",
	"abilities/ogre_magi/ogre_magi_multicast",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_multi_3"
)
LinkLuaModifier(
	"modifier_ogre_magi_multicast_custom_bkb_cd",
	"abilities/ogre_magi/ogre_magi_multicast",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_ogremagi_hero_4"
)
LinkLuaModifier(
	"modifier_ogre_magi_multicast_custom_bkb_buff",
	"abilities/ogre_magi/ogre_magi_multicast",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_ogremagi_hero_4" }
)

ogre_magi_multicast_custom = class({})
ogre_magi_multicast_custom.talents = {}

function ogre_magi_multicast_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_fire_shield_projectile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_ogre_magi/ogre_magi_multicast.vpcf", context)
	PrecacheResource("particle", "particles/generic/generic_armor_reduction.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/ogre_magichit.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/ogre_head.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/ogre_magi_multicast_infinity.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/ogre_magi_multicast_buff.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf",
		context
	)
	PrecacheResource("particle", "particles/ogre_magi/multicast_fire.vpcf", context)
	PrecacheResource("particle", "particles/ogre_magi/multicast_radius.vpcf", context)
end

function ogre_magi_multicast_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_spell = 0,
			r1_damage = 0,
			r1_targets = caster:GetTalentValue("modifier_ogremagi_multi_1", "targets", true),
			r1_range = caster:GetTalentValue("modifier_ogremagi_multi_1", "range", true),
			r1_damage_type = caster:GetTalentValue("modifier_ogremagi_multi_1", "damage_type", true),

			has_r2 = 0,
			r2_regen = 0,
			r2_heal = 0,
			r2_duration = caster:GetTalentValue("modifier_ogremagi_multi_2", "duration", true),
			r2_max = caster:GetTalentValue("modifier_ogremagi_multi_2", "max", true),

			r3_heal_reduce = 0,
			r3_damage = 0,
			r3_max = caster:GetTalentValue("modifier_ogremagi_multi_3", "max", true),
			r3_damage_type = caster:GetTalentValue("modifier_ogremagi_multi_3", "damage_type", true),
			r3_interval = caster:GetTalentValue("modifier_ogremagi_multi_3", "interval", true),

			has_r4 = 0,
			r4_chance = caster:GetTalentValue("modifier_ogremagi_multi_4", "chance", true),

			has_r7 = 0,
			r7_radius = caster:GetTalentValue("modifier_ogremagi_multi_7", "radius", true),
			r7_aura_radius = caster:GetTalentValue("modifier_ogremagi_multi_7", "aura_radius", true),
			r7_interval = caster:GetTalentValue("modifier_ogremagi_multi_7", "interval", true),
			r7_talent_cd = caster:GetTalentValue("modifier_ogremagi_multi_7", "talent_cd", true),
			r7_duration = caster:GetTalentValue("modifier_ogremagi_multi_7", "duration", true),
			r7_damage = caster:GetTalentValue("modifier_ogremagi_multi_7", "damage", true) / 100,
			r7_duration_reduce = caster:GetTalentValue("modifier_ogremagi_multi_7", "duration_reduce", true),
			r7_cdr = caster:GetTalentValue("modifier_ogremagi_multi_7", "cdr", true),

			has_h4 = 0,
			h4_health = caster:GetTalentValue("modifier_ogremagi_hero_4", "health", true),
			h4_talent_cd = caster:GetTalentValue("modifier_ogremagi_hero_4", "talent_cd", true),
			h4_duration = caster:GetTalentValue("modifier_ogremagi_hero_4", "duration", true),
			h4_status = caster:GetTalentValue("modifier_ogremagi_hero_4", "status", true),
			h4_bkb = caster:GetTalentValue("modifier_ogremagi_hero_4", "bkb", true),

			has_e7 = 0,
			e7_cost = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "cost", true) / 100,
			e7_cd = caster:GetTalentValue("modifier_ogremagi_bloodlust_7", "cd", true),

			has_q7 = 0,
		}
	end

	if caster:HasTalent("modifier_ogremagi_multi_1") then
		self.talents.has_r1 = 1
		self.talents.r1_spell = caster:GetTalentValue("modifier_ogremagi_multi_1", "spell")
		self.talents.r1_damage = caster:GetTalentValue("modifier_ogremagi_multi_1", "damage")
	end

	if caster:HasTalent("modifier_ogremagi_multi_2") then
		self.talents.has_r2 = 1
		self.talents.r2_regen = caster:GetTalentValue("modifier_ogremagi_multi_2", "regen")
		self.talents.r2_heal = caster:GetTalentValue("modifier_ogremagi_multi_2", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_ogremagi_multi_2", type = 1, value = self.talents.r2_heal, text = true }
		)
	end

	if caster:HasTalent("modifier_ogremagi_multi_3") then
		self.talents.r3_heal_reduce = caster:GetTalentValue("modifier_ogremagi_multi_3", "heal_reduce")
		self.talents.r3_damage = caster:GetTalentValue("modifier_ogremagi_multi_3", "damage")
	end

	if caster:HasTalent("modifier_ogremagi_multi_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_ogremagi_multi_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_ogremagi_hero_4") then
		self.talents.has_h4 = 1
		caster:AddDamageEvent_inc(self.tracker, true)
	end

	if caster:HasTalent("modifier_ogremagi_bloodlust_7") then
		self.talents.has_e7 = 1
		if IsServer() then
			self.multicast_delay = 0.3
		end
	end

	if caster:HasTalent("modifier_ogremagi_blast_7") then
		self.talents.has_q7 = 1
	end
end

function ogre_magi_multicast_custom:GetAbilityTextureName()
	if self.caster:HasModifier("modifier_ogre_magi_bloodlust_custom_legendary_reroll") then
		return "ogre_magi_dumb_luck"
	end
	return wearables_system:GetAbilityIconReplacement(self.caster, "ogre_magi_multicast", self)
end

function ogre_magi_multicast_custom:GetHealthCost(level)
	if not self.caster:HasModifier("modifier_ogre_magi_bloodlust_custom_legendary_reroll") then
		return 0
	end
	return self.talents.e7_cost * self.caster:GetHealth()
end

function ogre_magi_multicast_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_ogre_magi_multicast_custom"
end

function ogre_magi_multicast_custom:GetCooldown(iLevel)
	return (self.talents.has_r7 == 1 and self.talents.has_e7 == 0) and self.talents.r7_talent_cd or 0
end

function ogre_magi_multicast_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET
			+ DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM
	end
	if self.talents.has_r7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_NO_TARGET + DOTA_ABILITY_BEHAVIOR_IMMEDIATE
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function ogre_magi_multicast_custom:GetChance(name)
	if not self.chances or not self.chances[name] or self.chances[name] <= 0 then
		return 0
	end
	return self.chances[name]
		+ self.caster:GetStrength() / self.str_bonus
		+ (self.talents.has_r4 == 1 and self.talents.r4_chance or 0)
end

function ogre_magi_multicast_custom:OnSpellStart()
	if self.talents.has_e7 == 1 then
		if not self.caster.bloodlust_ability then
			return
		end
		local reroll = self.caster:HasModifier("modifier_ogre_magi_bloodlust_custom_legendary_reroll")
			and not self.multicast_k
		self.caster.bloodlust_ability:LegendaryProc(reroll)

		if not self.multicast_k then
			self.tracker:SpellEvent({ unit = self.caster, ability = self })
		end
		return
	end

	if self.talents.has_r7 == 0 then
		return
	end
	self.caster:AddNewModifier(self.caster, self, "modifier_ogre_magi_multicast_custom_legendary", {})
end

function ogre_magi_multicast_custom:OnProjectileHit(target, vLocation)
	if not target then
		return
	end
	DoDamage(
		{
			victim = target,
			attacker = self.caster,
			ability = self,
			damage_type = self.talents.r1_damage_type,
			damage = self.talents.r1_damage,
		},
		"modifier_ogremagi_multi_1"
	)
end

function ogre_magi_multicast_custom:TriggerSpell(ability, target)
	if not IsServer() then
		return
	end
	if ability == self then
		return
	end

	if not ability:IsItem() then
		if self.talents.has_r2 == 1 then
			self.caster:AddNewModifier(
				self.caster,
				self,
				"modifier_ogre_magi_multicast_custom_heal",
				{ duration = self.talents.r2_duration }
			)
		end
	end

	if self.talents.has_r1 == 1 then
		local targets = self.talents.r1_targets
		local info = {
			Source = self.caster,
			Ability = self,
			EffectName = "particles/units/heroes/hero_ogre_magi/ogre_magi_fire_shield_projectile.vpcf",
			iMoveSpeed = 900,
			bReplaceExisting = false,
		}

		for _, target in pairs(self.caster:FindTargets(self.talents.r1_range)) do
			info.Target = target
			ProjectileManager:CreateTrackingProjectile(info)
			targets = targets - 1
			if targets <= 0 then
				break
			end
		end
	end
end

modifier_ogre_magi_multicast_custom = class(mod_hidden)
function modifier_ogre_magi_multicast_custom:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.multicast_ability = self.ability

	self.ability.chances = {}

	self.ability.chances["multicast_2_times_real"] = self.ability:GetSpecialValueFor("multicast_2_times_real")
	self.ability.chances["multicast_3_times_real"] = self.ability:GetSpecialValueFor("multicast_3_times_real")
	self.ability.chances["multicast_4_times_real"] = self.ability:GetSpecialValueFor("multicast_4_times_real")

	self.ability.str_bonus = self.ability:GetSpecialValueFor("str_bonus")
	self.ability.fireblast_damage = self.ability:GetSpecialValueFor("fireblast_damage") / 100
	self.ability.fireblast_stun = self.ability:GetSpecialValueFor("fireblast_stun") / 100
	self.parent:AddSpellEvent(self, true)
end

function modifier_ogre_magi_multicast_custom:OnRefresh()
	self.ability.chances["multicast_2_times_real"] = self.ability:GetSpecialValueFor("multicast_2_times_real")
	self.ability.chances["multicast_3_times_real"] = self.ability:GetSpecialValueFor("multicast_3_times_real")
	self.ability.chances["multicast_4_times_real"] = self.ability:GetSpecialValueFor("multicast_4_times_real")
end

function modifier_ogre_magi_multicast_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if params.unit ~= self.parent then
		return
	end

	local ability = params.ability
	self.ability:TriggerSpell(ability)

	if IsValid(self.parent.ogre_innate) and ability:IsItem() and IsValid(params.target) then
		self.parent.ogre_innate:AbilityTarget(params.target, ability)
	end

	if self.parent:PassivesDisabled() then
		return
	end
	if params.target and not params.target:IsBaseNPC() then
		return
	end
	if bit.band(ability:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_CHANNELLED) ~= 0 then
		return
	end
	if not ability:IsItem() and not ability.multicast_delay then
		return
	end
	if ability:IsItem() and not self.parent:HasModifier("modifier_ogre_magi_multicast_custom_legendary") then
		return
	end

	local count = 0

	local mod = self.parent:FindModifierByName("modifier_ogre_magi_multicast_custom_bkb_buff")
	if mod then
		count = 3
		mod:Destroy()
	else
		for i = 4, 2, -1 do
			local name = "multicast_" .. i .. "_times_real"
			local chance = self.ability:GetChance(name)
			if chance > 0 and RollPseudoRandomPercentage(chance, 8880 + i, self.parent) then
				count = i - 1
				break
			end
		end
	end

	if count <= 0 then
		return
	end

	local delay = ability.multicast_delay or self.ability.talents.r7_interval
	local target = params.target and params.target:entindex() or nil
	local x
	local y

	if params.point then
		x = params.point.x
		y = params.point.y
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_ogre_magi_multicast_custom_cast",
		{ ability = ability:entindex(), target = target, count = count, delay = delay, x = x, y = y }
	)
end

function modifier_ogre_magi_multicast_custom:DamageEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h4 == 0 then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if self.parent:PassivesDisabled() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:GetHealthPercent() > self.ability.talents.h4_health then
		return
	end
	if self.parent:HasModifier("modifier_ogre_magi_multicast_custom_bkb_cd") then
		return
	end

	self.parent:Purge(false, true, false, true, true)

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_ogre_magi_multicast_custom_bkb_cd",
		{ duration = self.ability.talents.h4_talent_cd }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_ogre_magi_multicast_custom_bkb_buff",
		{ duration = self.ability.talents.h4_duration }
	)
	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_generic_debuff_immune",
		{ duration = self.ability.talents.h4_bkb, effect = 2, sound = 1 }
	)
end

function modifier_ogre_magi_multicast_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL,
		MODIFIER_PROPERTY_OVERRIDE_ABILITY_SPECIAL_VALUE,
	}
end

function modifier_ogre_magi_multicast_custom:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.r1_spell
end

function modifier_ogre_magi_multicast_custom:GetModifierStatusResistanceStacking()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_status
end

function modifier_ogre_magi_multicast_custom:GetModifierOverrideAbilitySpecial(data)
	if data.ability ~= self.ability then
		return
	end

	local value = data.ability_special_value .. "_real"
	if not self.ability.chances[value] or self.ability.chances[value] <= 0 then
		return 0
	end
	return 1
end

function modifier_ogre_magi_multicast_custom:GetModifierOverrideAbilitySpecialValue(data)
	if data.ability ~= self.ability then
		return
	end

	local value = data.ability_special_value .. "_real"
	if not self.ability.chances[value] or self.ability.chances[value] <= 0 then
		return
	end
	return self.ability:GetChance(value)
end

modifier_ogre_magi_multicast_custom_cast = class(mod_hidden)
function modifier_ogre_magi_multicast_custom_cast:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_ogre_magi_multicast_custom_cast:RemoveOnDeath()
	return false
end
function modifier_ogre_magi_multicast_custom_cast:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.cast_ability = EntIndexToHScript(table.ability)
	self.target = nil
	self.point = nil
	local effect_target = self.parent

	if table.x and table.y then
		self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	end

	if table.target then
		self.target = EntIndexToHScript(table.target)
		effect_target = self.target
	end

	self.count = table.count
	self.delay = table.delay
	self.damage = 1 + (self.ability.talents.has_r7 == 1 and self.ability.talents.r7_damage or 0)
	if
		self.cast_ability == self.parent.fireblast_ability
		or self.cast_ability == self.parent.fireblast_scepter_ability
	then
		self.damage = 1 + self.ability.fireblast_damage
	end

	local effect_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_ogre_magi/ogre_magi_multicast.vpcf",
		self
	)

	if self.parent.current_model == "models/items/ogre_magi/ogre_arcana/ogre_magi_arcana.vmdl" then
		effect_name = "particles/econ/items/ogre_magi/ogre_magi_arcana/ogre_magi_arcana_multicast_counter.vpcf"
		if self.parent:HasUnequipItem(7910) or self.parent:HasUnequipItem(79101) then
			effect_name = "particles/econ/items/ogre_magi/ogre_magi_arcana/ogre_magi_arcana_multicast_style.vpcf"
		end
	else
		if self.parent:HasUnequipItem(7910) or self.parent:HasUnequipItem(79101) then
			effect_name = "particles/econ/items/ogre_magi/ogre_magi_jackpot/ogre_magi_jackpot_multicast.vpcf"
		end
	end

	local effect_cast = ParticleManager:CreateParticle(effect_name, PATTACH_OVERHEAD_FOLLOW, effect_target)
	ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.count + 1, 0, 0))
	ParticleManager:ReleaseParticleIndex(effect_cast)

	effect_target:EmitSound("Hero_OgreMagi.Fireblast.x" .. self.count)

	self:StartIntervalThink(self.delay)
end

function modifier_ogre_magi_multicast_custom_cast:OnIntervalThink()
	if not IsServer() then
		return
	end

	local old_target = self.parent:GetCursorCastTarget()
	local old_point = self.parent:GetCursorPosition()
	local allow_cast = true

	if self.target then
		if self.target:IsNull() then
			self:Destroy()
			return
		end
		if self.target:IsInvulnerable() or self.target:IsOutOfGame() then
			allow_cast = false
		end
		self.parent:SetCursorCastTarget(self.target)

		if IsValid(self.parent.ogre_innate) and self.cast_ability:IsItem() then
			self.parent.ogre_innate:AbilityTarget(self.target, self.cast_ability)
		end
	end

	if self.point then
		self.parent:SetCursorPosition(self.point)
	end

	if allow_cast then
		self.ability:TriggerSpell(self.cast_ability)
		self.cast_ability.multicast_k = self.damage
		self.cast_ability:OnSpellStart()
		self.cast_ability.multicast_k = nil
	end

	self.parent:SetCursorCastTarget(old_target)
	self.parent:SetCursorPosition(old_point)

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_ogre_magi_multicast_custom_legendary = class(mod_hidden)
function modifier_ogre_magi_multicast_custom_legendary:GetStatusEffectName()
	return "particles/status_fx/status_effect_brewmaster_cinder_brew.vpcf"
end
function modifier_ogre_magi_multicast_custom_legendary:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_ogre_magi_multicast_custom_legendary:IsAura()
	return IsServer() and self.parent:IsAlive()
end
function modifier_ogre_magi_multicast_custom_legendary:GetAuraDuration()
	return 0
end
function modifier_ogre_magi_multicast_custom_legendary:GetAuraRadius()
	return self.aura_radius
end
function modifier_ogre_magi_multicast_custom_legendary:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_ENEMY
end
function modifier_ogre_magi_multicast_custom_legendary:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_ogre_magi_multicast_custom_legendary:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE
end
function modifier_ogre_magi_multicast_custom_legendary:GetModifierAura()
	return "modifier_ogre_magi_multicast_custom_legendary_status"
end
function modifier_ogre_magi_multicast_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.duration = self.ability.talents.r7_duration
	self.radius = self.ability.talents.r7_radius
	self.aura_radius = self.ability.talents.r7_aura_radius
	self.cdr = self.ability.talents.r7_cdr

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.timer = self.duration
	self.parent:GenericParticle("particles/ogre_magi/ogre_magi_multicast_infinity.vpcf", self, true)
	self.parent:GenericParticle("particles/ogre_magi/ogre_magi_multicast_buff.vpcf", self)

	self.ability:EndCd()

	self.radius_visual = ParticleManager:CreateParticleForPlayer(
		"particles/ogre_magi/multicast_radius.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent,
		self.parent:GetPlayerOwner()
	)
	ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.radius_visual, 1, Vector(self.radius, 0, 0))
	self:AddParticle(self.radius_visual, false, false, -1, false, false)

	self.parent:EmitSound("Ogre.Multi_legendary")
	self.parent:EmitSound("Ogre.Multi_legendary3")
	self.parent:EmitSound("Ogre.Multi_legendary_lp")

	self.interval = 0.1
	self.sound_count = 0
	self.sound_big = 0

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_ogre_magi_multicast_custom_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	local targets = self.parent:FindTargets(self.radius)
	if #targets > 0 then
		self.timer = math.min(self.duration, self.timer + self.interval * 2)
	else
		self.timer = math.max(0, self.timer - self.interval)
	end

	if self.timer <= 0 then
		self:Destroy()
		return
	end

	self.parent:UpdateUIshort({
		max_time = self.duration,
		time = self.timer,
		stack = self.timer,
		use_zero = 1,
		priority = 2,
		style = "OgreMulticast",
	})

	self.sound_count = self.sound_count + self.interval
	self.sound_big = self.sound_big + self.interval

	if self.sound_big >= 3 then
		self.sound_big = 0
		self.parent:EmitSound("Ogre.Multi_legendary")
	end

	if self.sound_count >= 1 then
		self.parent:EmitSound("Ogre.Multi_legendary2")
		self.sound_count = 0
	end
end

function modifier_ogre_magi_multicast_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability:StartCd()

	self.parent:StopSound("Ogre.Multi_legendary_lp")
	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, priority = 2, style = "OgreMulticast" })
end

function modifier_ogre_magi_multicast_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_ogre_magi_multicast_custom_legendary:GetModifierPercentageCooldown()
	return self.cdr
end

modifier_ogre_magi_multicast_custom_legendary_status = class(mod_hidden)
function modifier_ogre_magi_multicast_custom_legendary_status:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.status = self.ability.talents.r7_duration_reduce
end

function modifier_ogre_magi_multicast_custom_legendary_status:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
	}
end

function modifier_ogre_magi_multicast_custom_legendary_status:GetModifierStatusResistanceStacking()
	return self.status
end

modifier_ogre_magi_multicast_custom_heal = class(mod_visible)
function modifier_ogre_magi_multicast_custom_heal:GetTexture()
	return "buffs/ogre_magi/multicast_2"
end
function modifier_ogre_magi_multicast_custom_heal:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r2_max
	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_ogre_magi_multicast_custom_heal:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_ogre_magi_multicast_custom_heal:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT,
	}
end

function modifier_ogre_magi_multicast_custom_heal:GetModifierConstantHealthRegen()
	return self:GetStackCount() * self.ability.talents.r2_regen
end

modifier_ogre_magi_multicast_custom_fire = class(mod_visible)
function modifier_ogre_magi_multicast_custom_fire:GetTexture()
	return "buffs/ogre_magi/multicast_3"
end
function modifier_ogre_magi_multicast_custom_fire:GetEffectName()
	return "particles/econ/items/huskar/huskar_2021_immortal/huskar_2021_immortal_burning_spear_debuff.vpcf"
end
function modifier_ogre_magi_multicast_custom_fire:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max
	self.interval = self.ability.talents.r3_interval
	self.heal_reduce = self.ability.talents.r3_heal_reduce / self.max
	self.damage = self.ability.talents.r3_damage / self.max

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage_type = self.ability.talents.r3_damage_type,
		ability = self.ability,
	}

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	if self.ability.talents.has_q7 == 0 then
		self.effect_cast = self.parent:GenericParticle("particles/ogre_magi/multicast_fire.vpcf", self, true)
	end

	self:OnRefresh()
	self:StartIntervalThink(self.interval)
end

function modifier_ogre_magi_multicast_custom_fire:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()

	if self.effect_cast then
		local number_1 = self:GetStackCount()
		local double = math.floor(number_1 / 10)
		local number_2 = number_1 - double * 10
		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(double, number_1, number_2))
	end
end

function modifier_ogre_magi_multicast_custom_fire:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("Ogre.Blast_fire")
end

function modifier_ogre_magi_multicast_custom_fire:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.sound then
		self.sound = true
		self.parent:EmitSound("Ogre.Blast_fire")
	end

	self.damageTable.damage = self.damage * self:GetStackCount() * self.interval
	DoDamage(self.damageTable, "modifier_ogremagi_multi_3")
end

function modifier_ogre_magi_multicast_custom_fire:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_HP_REGEN_AMPLIFY_PERCENTAGE,
	}
end

function modifier_ogre_magi_multicast_custom_fire:OnTooltip()
	return self.damage * self:GetStackCount()
end

function modifier_ogre_magi_multicast_custom_fire:GetModifierHealChange()
	return self.heal_reduce * self:GetStackCount()
end

function modifier_ogre_magi_multicast_custom_fire:GetModifierHPRegenAmplify_Percentage()
	return self.heal_reduce * self:GetStackCount()
end

modifier_ogre_magi_multicast_custom_bkb_buff = class(mod_hidden)
function modifier_ogre_magi_multicast_custom_bkb_buff:GetEffectName()
	return "particles/ogre_magi/ogre_head.vpcf"
end
function modifier_ogre_magi_multicast_custom_bkb_buff:GetEffectAttachType()
	return PATTACH_OVERHEAD_FOLLOW
end

modifier_ogre_magi_multicast_custom_bkb_cd = class(mod_cd)
function modifier_ogre_magi_multicast_custom_bkb_cd:GetTexture()
	return "buffs/ogre_magi/hero_4"
end