--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_broodmother_spawn_spiderlings_custom_tracker",
	"abilities/broodmother/broodmother_spawn_spiderlings_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_broodmother_spawn_spiderlings_custom",
	"abilities/broodmother/broodmother_spawn_spiderlings_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spawn_spiderlings_custom_slow",
	"abilities/broodmother/broodmother_spawn_spiderlings_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spawn_spiderlings_custom_spider",
	"abilities/broodmother/broodmother_spawn_spiderlings_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spawn_spiderlings_custom_legendary_stack",
	"abilities/broodmother/broodmother_spawn_spiderlings_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_broodmother_spawn_7"
)
LinkLuaModifier(
	"modifier_broodmother_spawn_spiderlings_custom_legendary_caster",
	"abilities/broodmother/broodmother_spawn_spiderlings_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spawn_spiderlings_custom_death_damage",
	"abilities/broodmother/broodmother_spawn_spiderlings_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_spawn_spiderlings_custom_invun",
	"abilities/broodmother/broodmother_spawn_spiderlings_custom",
	LUA_MODIFIER_MOTION_NONE
)

broodmother_spawn_spiderlings_custom = class({})
broodmother_spawn_spiderlings_custom.talents = {}
broodmother_spawn_spiderlings_custom.legendary_stack = nil

function broodmother_spawn_spiderlings_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/broodmother_web_cast.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/spawn_stack.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/spawn_death_effect.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/broodmother_spiderlings_spawn.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/broodmother_spiderling_ambient.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/broodmother_spiderlings_debuff.vpcf", context)
end

function broodmother_spawn_spiderlings_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r1_spell = 0,
			r1_damage = 0,

			r2_cd = 0,
			r2_range = 0,

			has_r4 = 0,
			r4_cdr = caster:GetTalentValue("modifier_broodmother_spawn_4", "cdr", true),
			r4_mana = caster:GetTalentValue("modifier_broodmother_spawn_4", "mana", true),

			has_r7 = 0,
			r7_damage = caster:GetTalentValue("modifier_broodmother_spawn_7", "damage", true) / 100,
			r7_max = caster:GetTalentValue("modifier_broodmother_spawn_7", "max", true),
			r7_duration = caster:GetTalentValue("modifier_broodmother_spawn_7", "duration", true),
			r7_interval = caster:GetTalentValue("modifier_broodmother_spawn_7", "interval", true),

			h3_str = 0,
			h3_health = 0,

			has_h5 = 0,
			h5_heal = caster:GetTalentValue("modifier_broodmother_hero_5", "heal", true) / 100,

			has_w2 = 0,
			w2_heal = 0,

			has_e7 = 0,

			has_s1 = 0,
			s1_gold = 0,

			has_s2 = 0,
			s2_damage_reduce = 0,
			s2_max = caster:GetTalentValue("modifier_broodmother_scepter_2", "max", true),

			has_s3 = 0,
			s3_move = 0,
			s3_max_move = 0,

			s4_damage = 0,

			s5_health = 0,

			s6_max = 0,

			has_s7 = 0,
			s7_speed = caster:GetTalentValue("modifier_broodmother_scepter_7", "speed", true),

			has_s8 = 0,
			s8_damage = caster:GetTalentValue("modifier_broodmother_scepter_8", "damage", true) / 100,
			s8_radius = caster:GetTalentValue("modifier_broodmother_scepter_8", "radius", true),
			s8_spell = caster:GetTalentValue("modifier_broodmother_scepter_8", "spell", true),
			s8_damage_type = caster:GetTalentValue("modifier_broodmother_scepter_8", "damage_type", true),

			has_s9 = 0,
			s9_invun = caster:GetTalentValue("modifier_broodmother_scepter_9", "invun", true),
			s9_chance = caster:GetTalentValue("modifier_broodmother_scepter_9", "chance", true),
			s9_duration = caster:GetTalentValue("modifier_broodmother_scepter_9", "duration", true),
		}
	end

	if caster:HasTalent("modifier_broodmother_spawn_1") then
		self.talents.r1_spell = caster:GetTalentValue("modifier_broodmother_spawn_1", "spell")
		self.talents.r1_damage = caster:GetTalentValue("modifier_broodmother_spawn_1", "damage") / 100
	end

	if caster:HasTalent("modifier_broodmother_spawn_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_broodmother_spawn_2", "cd")
		self.talents.r2_range = caster:GetTalentValue("modifier_broodmother_spawn_2", "range")
	end

	if caster:HasTalent("modifier_broodmother_spawn_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_broodmother_spawn_7") then
		self.talents.has_r7 = 1
		if IsServer() then
			self.tracker:UpdateUI()
		end
	end

	if caster:HasTalent("modifier_broodmother_hero_3") then
		self.talents.h3_str = caster:GetTalentValue("modifier_broodmother_hero_3", "str")
		self.talents.h3_health = caster:GetTalentValue("modifier_broodmother_hero_3", "health") / 100
		if IsServer() then
			caster:AddPercentStat({ str = self.talents.h3_str / 100 }, self.tracker)
		end
	end

	if caster:HasTalent("modifier_broodmother_hero_5") then
		self.talents.has_h5 = 1
	end

	if caster:HasTalent("modifier_broodmother_web_2") then
		self.talents.has_w2 = 1
		self.talents.w2_heal = caster:GetTalentValue("modifier_broodmother_web_2", "heal") / 100
	end

	if caster:HasTalent("modifier_broodmother_bite_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_broodmother_scepter_1") then
		self.talents.has_s1 = 1
		self.talents.s1_gold = caster:GetTalentValue("modifier_broodmother_scepter_1", "gold")
		caster:AddDeathEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_broodmother_scepter_2") then
		self.talents.has_s2 = 1
		self.talents.s2_damage_reduce = caster:GetTalentValue("modifier_broodmother_scepter_2", "damage_reduce")
	end

	if caster:HasTalent("modifier_broodmother_scepter_3") then
		self.talents.has_s3 = 1
		self.talents.s3_move = caster:GetTalentValue("modifier_broodmother_scepter_3", "move")
		self.talents.s3_max_move = caster:GetTalentValue("modifier_broodmother_scepter_3", "max_move")
	end

	if caster:HasTalent("modifier_broodmother_scepter_4") then
		self.talents.s4_damage = caster:GetTalentValue("modifier_broodmother_scepter_4", "damage")
	end

	if caster:HasTalent("modifier_broodmother_scepter_5") then
		self.talents.s5_health = caster:GetTalentValue("modifier_broodmother_scepter_5", "health") / 100
	end

	if caster:HasTalent("modifier_broodmother_scepter_6") then
		self.talents.s6_max = caster:GetTalentValue("modifier_broodmother_scepter_6", "max")
	end

	if caster:HasTalent("modifier_broodmother_scepter_7") then
		self.talents.has_s7 = 1
	end

	if caster:HasTalent("modifier_broodmother_scepter_8") then
		self.talents.has_s8 = 1
	end

	if caster:HasTalent("modifier_broodmother_scepter_9") then
		self.talents.has_s9 = 1
	end
end

function broodmother_spawn_spiderlings_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "broodmother_spawn_spiderlings", self)
end

function broodmother_spawn_spiderlings_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_broodmother_spawn_spiderlings_custom_tracker"
end

function broodmother_spawn_spiderlings_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.r2_cd or 0)
end

function broodmother_spawn_spiderlings_custom:GetCastPoint()
	return self.BaseClass.GetCastPoint(self)
end

function broodmother_spawn_spiderlings_custom:GetMax()
	return self.spiderling_max + (self.caster:HasScepter() and (self.talents.s6_max or 0) or 0)
end

function broodmother_spawn_spiderlings_custom:OnSpellStart(new_target)
	local target = self:GetCursorTarget()
	local is_legendary = 0
	if new_target then
		target = new_target
		is_legendary = 1
		self.caster:EmitSound("Brood.Spawn_legendary_cast")
	else
		self.caster:EmitSound("Hero_Broodmother.SpawnSpiderlingsCast")
	end

	local proj_fx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_broodmother/broodmother_web_cast.vpcf",
		self
	)

	local projectile = {
		Source = self.caster,
		Target = target,
		Ability = self,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
		EffectName = proj_fx,
		iMoveSpeed = self.projectile_speed,
		vSourceLoc = self.caster:GetAbsOrigin(),
		bDrawsOnMinimap = false,
		bDodgeable = self.talents.has_r7 == 0,
		bIsAttack = false,
		bVisibleToEnemies = true,
		bReplaceExisting = false,
		flExpireTime = GameRules:GetGameTime() + 10,
		bProvidesVision = false,
		ExtraData = {
			is_legendary = is_legendary,
		},
	}

	local mod = target:FindModifierByName("modifier_broodmother_spawn_spiderlings_custom_legendary_stack")
	if mod and is_legendary == 0 then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_broodmother_spawn_spiderlings_custom_legendary_caster",
			{ target = target:entindex(), count = mod:GetStackCount() }
		)
	end

	ProjectileManager:CreateTrackingProjectile(projectile)
end

function broodmother_spawn_spiderlings_custom:OnProjectileHit_ExtraData(target, vLocation, table)
	if not target then
		return
	end
	if target:TriggerSpellAbsorb(self) then
		return
	end

	local is_legendary = table.is_legendary
	local damage = self.damage + self.talents.r1_damage * self.caster:GetIntellect(false)
	local damage_ability = nil

	if is_legendary == 1 then
		target:EmitSound("Brood.Spawn_legendary_hit")
		damage = damage * self.talents.r7_damage
		self:CreateSpider(target:GetAbsOrigin())
		damage_ability = "modifier_broodmother_spawn_7"
	else
		target:EmitSound("Hero_Broodmother.SpawnSpiderlingsImpact")

		if target:IsRealHero() then
			self:DeathSpawn(target)
		else
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_broodmother_spawn_spiderlings_custom",
				{ duration = self.buff_duration }
			)
		end

		if self.talents.has_r7 == 1 then
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_broodmother_spawn_spiderlings_custom_legendary_stack",
				{ duration = self.talents.r7_duration }
			)
		end
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_broodmother_spawn_spiderlings_custom_slow",
		{ duration = self.slow_duration }
	)

	local damage_table =
		{ victim = target, attacker = self.caster, damage = damage, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }
	DoDamage(damage_table, damage_ability)
end

function broodmother_spawn_spiderlings_custom:GiveGold()
	if not IsServer() then
		return
	end
	if self.talents.has_s1 == 0 then
		return
	end
	if not self.caster:HasScepter() then
		return
	end

	self.caster:GiveGold(self.talents.s1_gold, nil, nil, "modifier_broodmother_scepter_1")
end

function broodmother_spawn_spiderlings_custom:DeathSpawn(target)
	if not IsServer() then
		return
	end

	target:GenericParticle(
		wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_broodmother/broodmother_spiderlings_spawn.vpcf",
			self
		)
	)
	target:EmitSound("Hero_Broodmother.SpawnSpiderlings")

	for i = 1, self.count do
		self:CreateSpider(target:GetAbsOrigin())
	end
end

function broodmother_spawn_spiderlings_custom:CreateSpider(point, is_respawn, new_duration)
	if not IsServer() then
		return
	end
	if not self.caster:IsAlive() then
		return
	end

	local duration = self.spiderling_duration
	if self.caster:HasScepter() and self.talents.has_s9 == 1 then
		duration = duration + self.talents.s9_duration
	end
	if new_duration then
		duration = new_duration
	end

	if not self.tracker or self.tracker:GetStackCount() >= self:GetMax() then
		return
	end

	local unit = CreateUnitByName(
		"npc_dota_broodmother_spiderling_custom",
		point,
		false,
		self.caster,
		self.caster,
		self.caster:GetTeamNumber()
	)
	unit:AddNewModifier(
		self.caster,
		self,
		"modifier_broodmother_spawn_spiderlings_custom_spider",
		{ is_respawn = is_respawn and 1 or 0, new_duration = duration }
	)
	local modifier_kill = unit:AddNewModifier(self.caster, self, "modifier_kill", { duration = duration })

	local new_model = wearables_system:GetUnitModelReplacement(self.caster, "npc_dota_broodmother_spiderling")
	if new_model then
		unit:SetModel(new_model)
		unit:SetOriginalModel(new_model)
	end

	local pfx_spider_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_broodmother/broodmother_spiderling_ambient.vpcf",
		self,
		"broodmother_spawn_spiderlings_custom"
	)
	if pfx_spider_name then
		unit:GenericParticle(pfx_spider_name, modifier_kill)
	end

	if self.caster:HasScepter() and self.talents.has_s9 == 1 then
		unit:AddNewModifier(
			self.caster,
			self,
			"modifier_broodmother_spawn_spiderlings_custom_invun",
			{ duration = self.talents.s9_invun }
		)
	end

	unit.owner = self.caster
	unit:SetControllableByPlayer(self.caster:GetPlayerID(), true)
	FindClearSpaceForUnit(unit, unit:GetAbsOrigin(), false)
end

modifier_broodmother_spawn_spiderlings_custom_tracker = class(mod_visible)
function modifier_broodmother_spawn_spiderlings_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability.active_spiders = {}
	self.ability:UpdateTalents()

	self.parent.spawn_ability = self.ability

	self.ability.buff_duration = self.ability:GetSpecialValueFor("buff_duration")
	self.ability.spiderling_duration = self.ability:GetSpecialValueFor("spiderling_duration")
	self.ability.spiderling_max = self.ability:GetSpecialValueFor("spiderling_max")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.spiderling_attack = self.ability:GetSpecialValueFor("spiderling_attack")
	self.ability.projectile_speed = self.ability:GetSpecialValueFor("projectile_speed")
	self.ability.spiderling_hp = self.ability:GetSpecialValueFor("spiderling_hp")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
	self.ability.count = self.ability:GetSpecialValueFor("count")
	self.ability.movement_speed = self.ability:GetSpecialValueFor("movement_speed")
	self.ability.spiderite_chance = self.ability:GetSpecialValueFor("spiderite_chance")
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.spiderling_attack = self.ability:GetSpecialValueFor("spiderling_attack")
	self.ability.movement_speed = self.ability:GetSpecialValueFor("movement_speed")
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 1 then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end

	local max = self.ability.talents.r7_max
	local stack = 0
	if IsValid(self.ability.legendary_stack) then
		stack = self.ability.legendary_stack:GetStackCount()
	end

	self.parent:UpdateUIlong({ max = max, stack = stack, style = "BroodSpawn" })
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:DeathEvent(params)
	if not IsServer() then
		return
	end
	if not self.parent:HasScepter() then
		return
	end
	if not params.unit:IsUnit() then
		return
	end
	if not params.attacker then
		return
	end

	local attacker = params.attacker

	if
		(
			attacker == self.parent
			and params.inflictor
			and self.parent.milk_ability
			and params.inflictor == self.parent.milk_ability
		)
		or (
			attacker.owner
			and attacker.owner == self.parent
			and attacker:HasModifier("modifier_broodmother_spawn_spiderlings_custom_spider")
		)
	then
		self.ability:GiveGold()
	end
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
	}
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:OnTooltip()
	return self.ability:GetMax()
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	return (self.ability.talents.has_s7 == 1 and self.parent:HasScepter())
			and self.ability.talents.s7_speed * self:GetStackCount()
		or 0
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.r1_spell
		+ ((self.ability.talents.has_s8 == 1 and self.parent:HasScepter()) and self.ability.talents.s8_spell or 0)
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.r2_range
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_cdr
end

function modifier_broodmother_spawn_spiderlings_custom_tracker:GetModifierPercentageManacostStacking()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_mana
end

modifier_broodmother_spawn_spiderlings_custom_slow = class(mod_hidden)
function modifier_broodmother_spawn_spiderlings_custom_slow:IsPurgable()
	return true
end
function modifier_broodmother_spawn_spiderlings_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.slow = self.ability.movement_speed

	if not IsServer() then
		return
	end

	if self.parent:IsRealHero() then
		local debuff_pfx = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_broodmother/broodmother_spiderlings_debuff.vpcf",
			self,
			"broodmother_spawn_spiderlings_custom"
		)
		self.parent:GenericParticle(debuff_pfx, self)
	end
end

function modifier_broodmother_spawn_spiderlings_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_broodmother_spawn_spiderlings_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_broodmother_spawn_spiderlings_custom = class(mod_visible)
function modifier_broodmother_spawn_spiderlings_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_broodmother_spawn_spiderlings_custom:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.duration = self.ability.buff_duration
	self.count = self.ability.count

	if not IsServer() then
		return
	end
	local debuff_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_broodmother/broodmother_spiderlings_debuff.vpcf",
		self,
		"broodmother_spawn_spiderlings_custom"
	)
	self.parent:GenericParticle(debuff_pfx, self)
end

function modifier_broodmother_spawn_spiderlings_custom:OnDestroy()
	if not IsServer() then
		return
	end
	if self.parent:IsAlive() then
		return
	end

	self.ability:DeathSpawn(self.parent)
end

modifier_broodmother_spawn_spiderlings_custom_spider = class(mod_hidden)
function modifier_broodmother_spawn_spiderlings_custom_spider:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	local damage = self.ability.spiderling_attack
	local health = self.ability.spiderling_hp

	self.has_scepter = self.caster:HasScepter()
	if self.has_scepter then
		damage = damage + self.ability.talents.s4_damage
		health = health + self.caster:GetMaxHealth() * self.ability.talents.s5_health
	end

	health = health * (1 + self.ability.talents.h3_health)

	if not IsServer() then
		return
	end
	self.duration = table.new_duration
	self.is_respawn = table.is_respawn
	self.ability.active_spiders[self.parent] = true

	if IsValid(self.ability.tracker) then
		self.ability.tracker:IncrementStackCount()
	end

	self.parent:SetBaseMaxHealth(health)

	self.parent:SetBaseDamageMin(damage)
	self.parent:SetBaseDamageMax(damage)

	if self.ability.talents.has_w2 == 1 then
		self.parent:AddLifesteal(
			self,
			{
				name = "modifier_broodmother_web_2",
				type = 1,
				heal_unit = self.caster,
				value = self.ability.talents.w2_heal,
			}
		)
	end

	if self.ability.talents.has_h5 == 1 then
		self.parent:AddLifesteal(
			self,
			{ name = "modifier_broodmother_hero_5", heal_unit = self.caster, value = self.ability.talents.h5_heal }
		)
	end
end

function modifier_broodmother_spawn_spiderlings_custom_spider:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability.active_spiders[self.parent] = nil

	if self.caster:HasScepter() and self:GetElapsedTime() < self.duration then
		if self.ability.talents.has_s1 == 1 then
			self.ability:GiveGold()
		end

		if
			self.ability.talents.has_s9 == 1
			and self.is_respawn == 0
			and RollPseudoRandomPercentage(self.ability.talents.s9_chance, 5130, self.caster)
		then
			local point = self.parent:GetAbsOrigin()
			Timers:CreateTimer(1, function()
				if IsValid(self.ability) and players[self.caster:GetId()] then
					EmitSoundOnLocationWithCaster(point, "Brood.Spawn_passive", self.caster)
					self.ability:CreateSpider(point, true)
				end
			end)
		end

		if self.ability.talents.has_s8 == 1 then
			self.parent:EmitSound("Brood.Spawn_death_damage")
			local effect_cast = ParticleManager:CreateParticle(
				"particles/broodmother/spawn_death_effect.vpcf",
				PATTACH_ABSORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				effect_cast,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(effect_cast)
			for _, target in pairs(self.caster:FindTargets(self.ability.talents.s8_radius, self.parent:GetAbsOrigin())) do
				target:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_broodmother_spawn_spiderlings_custom_death_damage",
					{ duration = 0.1, damage = self.parent:GetMaxHealth() * self.ability.talents.s8_damage }
				)
			end
		end
	end

	if not IsValid(self.ability.tracker) then
		return
	end
	self.ability.tracker:DecrementStackCount()
end

function modifier_broodmother_spawn_spiderlings_custom_spider:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_broodmother_spawn_spiderlings_custom_spider:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_s2 == 0 or not self.has_scepter then
		return
	end
	return self.ability.talents.s2_damage_reduce
		* (math.min(self.ability.talents.s2_max, self.ability.tracker:GetStackCount()))
end

function modifier_broodmother_spawn_spiderlings_custom_spider:GetModifierMoveSpeedBonus_Constant()
	if not self.has_scepter then
		return
	end
	return self.ability.talents.s3_move
end

function modifier_broodmother_spawn_spiderlings_custom_spider:GetModifierIgnoreMovespeedLimit()
	if not self.has_scepter then
		return
	end
	return self.ability.talents.has_s3 == 1 and 1 or 0
end

function modifier_broodmother_spawn_spiderlings_custom_spider:GetModifierMoveSpeed_Max()
	if not self.has_scepter then
		return
	end
	return self.ability.talents.has_s3 == 1 and self.ability.talents.s3_max_move or nil
end

function modifier_broodmother_spawn_spiderlings_custom_spider:GetModifierMoveSpeed_Limit()
	if not self.has_scepter then
		return
	end
	return self.ability.talents.has_s3 == 1 and self.ability.talents.s3_max_move or nil
end

modifier_broodmother_spawn_spiderlings_custom_legendary_stack = class(mod_visible)
function modifier_broodmother_spawn_spiderlings_custom_legendary_stack:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r7_max
	if not IsServer() then
		return
	end

	if self.parent:IsRealHero() and not self.ability.legendary_stack then
		self.ability.legendary_stack = self
	end

	if self.ability.talents.has_e7 == 0 then
		self.effect_cast = self.parent:GenericParticle("particles/broodmother/spawn_stack.vpcf", self, true)
	end

	self:OnRefresh()
end

function modifier_broodmother_spawn_spiderlings_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self.effect_cast then
		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
		if IsValid(self.ability.tracker) and self.ability.legendary_stack == self then
			self.ability.tracker:UpdateUI()
		end
	end

	if self:GetStackCount() >= self.max then
		self:Destroy()
	end
end

function modifier_broodmother_spawn_spiderlings_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.legendary_stack == self then
		self.ability.legendary_stack = nil
		if IsValid(self.ability.tracker) then
			self.ability.tracker:UpdateUI()
		end
	end
end

modifier_broodmother_spawn_spiderlings_custom_legendary_caster = class(mod_hidden)
function modifier_broodmother_spawn_spiderlings_custom_legendary_caster:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_broodmother_spawn_spiderlings_custom_legendary_caster:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.count = table.count
	self.target = EntIndexToHScript(table.target)
	self:StartIntervalThink(self.ability.talents.r7_interval)
end

function modifier_broodmother_spawn_spiderlings_custom_legendary_caster:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.target) then
		return
	end

	self.ability:OnSpellStart(self.target)
	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_broodmother_spawn_spiderlings_custom_death_damage = class(mod_hidden)
function modifier_broodmother_spawn_spiderlings_custom_death_damage:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.damage = table.damage
end

function modifier_broodmother_spawn_spiderlings_custom_death_damage:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.damage = self.damage + table.damage
end

function modifier_broodmother_spawn_spiderlings_custom_death_damage:OnDestroy()
	if not IsServer() then
		return
	end
	if self.damage <= 0 then
		return
	end

	DoDamage(
		{
			victim = self.parent,
			attacker = self.caster,
			ability = self.ability,
			damage_type = self.ability.talents.s8_damage_type,
			damage = self.damage,
		},
		"modifier_broodmother_scepter_8"
	)
end

modifier_broodmother_spawn_spiderlings_custom_invun = class(mod_hidden)
function modifier_broodmother_spawn_spiderlings_custom_invun:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end

broodmother_spawn_spiderite_custom = class({})