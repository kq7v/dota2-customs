--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_broodmother_innate_custom",
	"abilities/broodmother/broodmother_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_innate_custom_attack",
	"abilities/broodmother/broodmother_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_innate_custom_effect_cd",
	"abilities/broodmother/broodmother_innate_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_broodmother_innate_custom_magic",
	"abilities/broodmother/broodmother_innate_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_broodmother_spawn_3", "modifier_broodmother_web_3" }
)

broodmother_innate_custom = class({})
broodmother_innate_custom.talents = {}

function broodmother_innate_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("soundfile", "soundevents/npc_dota_hero_broodmother.vsndevts", context)
	PrecacheResource("particle", "particles/units/heroes/hero_broodmother/mothers_love_heal.vpcf", context)
	PrecacheResource("particle", "particles/econ/items/viper/viper_ti7_immortal/viper_poison_debuff_ti7.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/range_attack.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_dragon_knight/dragon_knight_elder_dragon_corrosive_explosion.vpcf",
		context
	)
	PrecacheResource("particle", "particles/broodmother/innate_proc.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/bite_legendary_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", context)
	PrecacheResource("particle", "particles/broodmother/web_silence_tether.vpcf", context)
	dota1x6:PrecacheShopItems("npc_dota_hero_broodmother", context)
end

function broodmother_innate_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r3 = 0,
			r3_cd = 0,
			r3_magic = 0,
			r3_duration = caster:GetTalentValue("modifier_broodmother_spawn_3", "duration", true),
			r3_max = caster:GetTalentValue("modifier_broodmother_spawn_3", "max", true),

			has_r4 = 0,
			r4_cd_items = caster:GetTalentValue("modifier_broodmother_spawn_4", "cd_items", true),

			has_r7 = 0,
			r7_cd = caster:GetTalentValue("modifier_broodmother_spawn_7", "cd", true) / 100,

			has_h4 = 0,
			h4_resist = caster:GetTalentValue("modifier_broodmother_hero_4", "resist", true),

			has_h6 = 0,
			h6_distance = caster:GetTalentValue("modifier_broodmother_hero_6", "distance", true),
			h6_range = caster:GetTalentValue("modifier_broodmother_hero_6", "range", true),
			h6_damage = caster:GetTalentValue("modifier_broodmother_hero_6", "damage", true),
			h6_chance = caster:GetTalentValue("modifier_broodmother_hero_6", "chance", true),
			h6_duration = caster:GetTalentValue("modifier_broodmother_hero_6", "duration", true),
			h6_max_move_real = caster:GetTalentValue("modifier_broodmother_hero_6", "max_move_real", true),

			w1_damage = 0,
			w1_base = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_base = 0,
			w3_heal = caster:GetTalentValue("modifier_broodmother_web_3", "heal", true) / 100,
			w3_duration = caster:GetTalentValue("modifier_broodmother_web_3", "duration", true),
			w3_max = caster:GetTalentValue("modifier_broodmother_web_3", "max", true),
			w3_radius = caster:GetTalentValue("modifier_broodmother_web_3", "radius", true),
			w3_interval = caster:GetTalentValue("modifier_broodmother_web_3", "interval", true),
			w3_damage_type = caster:GetTalentValue("modifier_broodmother_web_3", "damage_type", true),

			has_e1 = 0,

			has_e4 = 0,
			e4_stun = caster:GetTalentValue("modifier_broodmother_bite_4", "stun", true),
			e4_chance = caster:GetTalentValue("modifier_broodmother_bite_4", "chance", true),
			e4_chance_hero = caster:GetTalentValue("modifier_broodmother_bite_4", "chance_hero", true),
			e4_talent_cd = caster:GetTalentValue("modifier_broodmother_bite_4", "talent_cd", true),

			has_e7 = 0,

			s6_chance = 0,
		}
	end

	if caster:HasTalent("modifier_broodmother_hero_6") then
		self.talents.has_h6 = 1
		if IsServer() and not self.distance_init then
			self.distance_init = true
			self.tracker.distance_pass = 0
			self.tracker.pos = caster:GetAbsOrigin()
			self.tracker:StartIntervalThink(0.2)
		end
	end

	if caster:HasTalent("modifier_broodmother_spawn_3") then
		self.talents.has_r3 = 1
		self.talents.r3_cd = caster:GetTalentValue("modifier_broodmother_spawn_3", "cd")
		self.talents.r3_magic = caster:GetTalentValue("modifier_broodmother_spawn_3", "magic") / self.talents.r3_max
	end

	if caster:HasTalent("modifier_broodmother_spawn_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_broodmother_spawn_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_broodmother_hero_4") then
		self.talents.has_h4 = 1
	end

	if caster:HasTalent("modifier_broodmother_web_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_broodmother_web_1", "damage") / 100
		self.talents.w1_base = caster:GetTalentValue("modifier_broodmother_web_1", "base")
	end

	if caster:HasTalent("modifier_broodmother_web_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_broodmother_web_3", "damage") / 100
		self.talents.w3_base = caster:GetTalentValue("modifier_broodmother_web_3", "base")
	end

	if caster:HasTalent("modifier_broodmother_bite_1") then
		self.talents.has_e1 = 1
	end

	if caster:HasTalent("modifier_broodmother_bite_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { name = "bash", illusion = true, land = true, prd_owner = true })
	end

	if caster:HasTalent("modifier_broodmother_bite_7") then
		self.talents.has_e7 = 1
	end

	if caster:HasTalent("modifier_broodmother_scepter_6") then
		self.talents.s6_chance = caster:GetTalentValue("modifier_broodmother_scepter_6", "chance")
	end
end

function broodmother_innate_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_broodmother_innate_custom"
end

function broodmother_innate_custom:OnProjectileHit(target, location)
	if not IsServer() then
		return
	end
	if not target or not target:IsUnit() then
		return
	end

	local hit_effect =
		ParticleManager:CreateParticle("particles/broodmother/bite_legendary_attack.vpcf", PATTACH_CUSTOMORIGIN, target)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:SetParticleControlEnt(
		hit_effect,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		false
	)
	ParticleManager:ReleaseParticleIndex(hit_effect)

	target:EmitSound("Brood.Auto_attack_hit")

	self.caster:AddNewModifier(self.caster, self, "modifier_broodmother_innate_custom_attack", { duration = 1 })
	self.caster:PerformAttack(target, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_broodmother_innate_custom_attack")

	if IsValid(self.caster.spawn_ability) and RollPseudoRandomPercentage(self.talents.h6_chance, 5124, self.caster) then
		target:EmitSound("Brood.Spawn_passive")
		self.caster.spawn_ability:CreateSpider(target:GetAbsOrigin(), nil, self.talents.h6_duration)
	end
end

function broodmother_innate_custom:DealDamage(target, damage_ability)
	if not IsServer() then
		return
	end
	local damage = self.damage + self.talents.w1_base + self.talents.w1_damage * self.caster:GetMaxHealth()

	target:EmitSound("Brood.Innate_proc")
	target:EmitSound("Brood.Innate_proc2")
	target:GenericParticle("particles/broodmother/innate_proc.vpcf")

	if self.talents.has_r4 == 1 and (not damage_ability or target:IsRealHero()) then
		self.caster:CdItems(self.talents.r4_cd_items, "modifier_broodmother_spawn_4")
	end

	local cast_effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_dragon_knight/dragon_knight_elder_dragon_corrosive_explosion.vpcf",
		PATTACH_POINT_FOLLOW,
		target
	)
	ParticleManager:SetParticleControlEnt(
		cast_effect,
		3,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(cast_effect)

	local damageTable =
		{ victim = target, attacker = self.caster, ability = self, damage_type = DAMAGE_TYPE_MAGICAL, damage = damage }
	local real_damage = DoDamage(damageTable, damage_ability)

	if self.talents.has_r3 == 1 or self.talents.has_w3 == 1 then
		local duration = self.talents.has_r3 == 1 and self.talents.r3_duration or self.talents.w3_duration
		target:AddNewModifier(self.caster, self, "modifier_broodmother_innate_custom_magic", { duration = duration })
	end

	target:SendNumber(9, real_damage)
	local result = self.caster:CanLifesteal(target)
	if not result then
		return
	end

	local search_targets = { [self.caster] = true }
	if IsValid(self.caster.spawn_ability) and self.caster.spawn_ability.active_spiders then
		for spider, _ in pairs(self.caster.spawn_ability.active_spiders) do
			search_targets[spider] = true
		end
	end

	for heal_target, _ in pairs(search_targets) do
		if
			IsValid(heal_target)
			and heal_target:IsAlive()
			and (target:GetAbsOrigin() - heal_target:GetAbsOrigin()):Length2D() <= self.kill_heal_aoe
		then
			heal_target:GenericHeal(real_damage * result * self.heal, self, true, "")
		end
	end
end

modifier_broodmother_innate_custom = class(mod_hidden)
function modifier_broodmother_innate_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self

	self.distance_pass = 0
	self.pos = self.parent:GetAbsOrigin()

	self.ability:UpdateTalents()

	self.parent.milk_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.chance = self.ability:GetSpecialValueFor("chance")
	self.ability.cd = self.ability:GetSpecialValueFor("cd")
	self.ability.heal = self.ability:GetSpecialValueFor("heal") / 100
	self.ability.kill_heal_aoe = self.ability:GetSpecialValueFor("kill_heal_aoe")

	if not IsServer() then
		return
	end
	self.info = {
		EffectName = "particles/broodmother/range_attack.vpcf",
		Ability = self.ability,
		iMoveSpeed = 1400,
		Source = self.parent,
		bDodgeable = true,
		bProvidesVision = true,
		iVisionTeamNumber = self.parent:GetTeamNumber(),
		iVisionRadius = 50,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
	}

	self.parent:AddProc(self, { name = "hit", illusion = true, land = true })
	self.parent:AddProc(self, { illusion = true, land = true, prd_owner = true })
	self.parent:AddProc(self, { name = "spiderite", illusion = true, land = true, prd_owner = true })
end

function modifier_broodmother_innate_custom:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_broodmother_innate_custom:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	local attacker = params.attacker
	if name == "bash" then
		if not IsValid(self.parent.bite_ability) then
			return 0
		end
		if
			attacker ~= self.parent and not attacker:HasModifier("modifier_broodmother_spawn_spiderlings_custom_spider")
		then
			return 0
		end
		if params.target:HasModifier("modifier_broodmother_incapacitating_bite_custom_bash_cd") then
			return 0
		end
		return attacker == self.parent and self.ability.talents.e4_chance_hero or self.ability.talents.e4_chance
	end
	if name == "spiderite" then
		local ability = self.parent.spawn_ability
		if not IsValid(ability) or not ability.tracker then
			return 0
		end
		if not attacker:HasAbility("broodmother_spawn_spiderite_custom") then
			return 0
		end
		if ability.tracker:GetStackCount() >= ability:GetMax() then
			return 0
		end
		return ability.spiderite_chance + (self.parent:HasScepter() and self.ability.talents.s6_chance or 0)
	end
	if params.target:HasModifier("modifier_broodmother_innate_custom_effect_cd") then
		return 0
	end
	return self.ability.chance
end

function modifier_broodmother_innate_custom:AttackProc(params, name)
	if name ~= "hit" then
		return
	end

	local attacker = params.attacker
	local real_attacker = attacker
	local target = params.target
	if attacker.owner then
		attacker = attacker.owner
	end

	if attacker ~= self.parent then
		return
	end

	if
		real_attacker == self.parent
		and self.parent:HasModifier("modifier_broodmother_insatiable_hunger_custom")
		and IsValid(self.parent.insatiable_ability)
	then
		DoCleaveAttack(
			self.parent,
			target,
			self.parent.insatiable_ability,
			self.parent.insatiable_ability.cleave * params.damage,
			150,
			360,
			650,
			"particles/bloodseeker/thirst_cleave.vpcf"
		)
	end

	if IsValid(self.parent.bite_ability) then
		local ability = self.parent.bite_ability
		if
			not real_attacker:PassivesDisabled()
			and (
				real_attacker == self.parent
				or real_attacker:IsIllusion()
				or (
					self.ability.talents.has_e7 == 1
					and real_attacker:HasModifier("modifier_broodmother_spawn_spiderlings_custom_spider")
				)
			)
		then
			target:AddNewModifier(
				self.parent,
				self.parent:BkbAbility(ability, self.ability.talents.has_e4 == 1),
				"modifier_broodmother_incapacitating_bite_custom",
				{ duration = ability.duration }
			)
		end

		if self.ability.talents.has_e1 == 1 then
			if target:HasModifier("modifier_broodmother_incapacitating_bite_custom") then
				real_attacker:AddNewModifier(
					self.parent,
					ability,
					"modifier_broodmother_incapacitating_bite_custom_speed",
					{ duration = ability.duration }
				)
			else
				real_attacker:RemoveModifierByName("modifier_broodmother_incapacitating_bite_custom_speed")
			end
		end

		if
			params.procs
			and params.procs[self]
			and params.procs[self].bash
			and not target:HasModifier("modifier_broodmother_incapacitating_bite_custom_bash_cd")
		then
			target:EmitSound("Brood.Bite_bash")
			local cast_effect = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_dragon_knight/dragon_knight_elder_dragon_corrosive_explosion.vpcf",
				PATTACH_POINT_FOLLOW,
				target
			)
			ParticleManager:SetParticleControlEnt(
				cast_effect,
				3,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(cast_effect)

			target:AddNewModifier(
				self.parent,
				self.parent:BkbAbility(ability, true),
				"modifier_bashed",
				{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.e4_stun }
			)
			target:AddNewModifier(
				self.parent,
				ability,
				"modifier_broodmother_incapacitating_bite_custom_bash_cd",
				{ duration = self.ability.talents.e4_talent_cd }
			)
		end

		if target:HasModifier("modifier_broodmother_incapacitating_bite_custom_legendary_active") then
			if real_attacker == self.parent then
				local hit_effect = ParticleManager:CreateParticle(
					"particles/broodmother/bite_legendary_attack.vpcf",
					PATTACH_CUSTOMORIGIN,
					target
				)
				ParticleManager:SetParticleControlEnt(
					hit_effect,
					0,
					target,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					target:GetAbsOrigin(),
					false
				)
				ParticleManager:SetParticleControlEnt(
					hit_effect,
					1,
					target,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					target:GetAbsOrigin(),
					false
				)
				ParticleManager:ReleaseParticleIndex(hit_effect)
			end
			target:EmitSound("Brood.Bite_legendary_attack")
		end
	end

	if
		params.procs
		and params.procs[self]
		and params.procs[self].spiderite
		and self:GetProcChance(params, "spiderite") > 0
	then
		target:EmitSound("Brood.Spawn_passive")
		self.parent.spawn_ability:CreateSpider(target:GetAbsOrigin())
	end

	if not params.procs or not params.procs[self] or not params.procs[self].default then
		return
	end
	if target:HasModifier("modifier_broodmother_innate_custom_effect_cd") then
		return
	end

	if self.ability.talents.has_r7 == 1 and IsValid(self.parent.spawn_ability) then
		self.parent:CdAbility(
			self.parent.spawn_ability,
			self.parent.spawn_ability:GetEffectiveCooldown(self.parent.spawn_ability:GetLevel())
				* self.ability.talents.r7_cd,
			nil,
			"modifier_broodmother_spawn_7"
		)
	end

	local search_targets = { [self.parent] = true }
	if IsValid(self.parent.spawn_ability) and self.parent.spawn_ability.active_spiders then
		for spider, _ in pairs(self.parent.spawn_ability.active_spiders) do
			search_targets[spider] = true
		end
	end

	for heal_target, _ in pairs(search_targets) do
		if
			IsValid(heal_target)
			and heal_target:IsAlive()
			and (target:GetAbsOrigin() - heal_target:GetAbsOrigin()):Length2D() <= self.ability.kill_heal_aoe
		then
			local cast_effect = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_broodmother/mothers_love_heal.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
				heal_target
			)
			ParticleManager:SetParticleControlEnt(
				cast_effect,
				0,
				heal_target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				heal_target:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				cast_effect,
				1,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(cast_effect)
		end
	end
	local cd = self.ability.cd + self.ability.talents.r3_cd
	target:AddNewModifier(self.parent, self.ability, "modifier_broodmother_innate_custom_effect_cd", { duration = cd })
	self.ability:DealDamage(target)
end

function modifier_broodmother_innate_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h6 == 0 then
		return
	end

	local new_pos = self.parent:GetAbsOrigin()
	local delta = (new_pos - self.pos):Length2D()
	self.pos = new_pos

	if self.parent:IsStunned() or self.parent:IsDisarmed() or self.parent:IsHexed() then
		return
	end

	self.distance_pass = self.distance_pass + delta
	if self.distance_pass >= self.ability.talents.h6_distance and not self.parent:IsInvisible() then
		self.distance_pass = 0
		local target = self.parent:RandomTarget(self.ability.talents.h6_range)
		if target then
			self.parent:EmitSound("Brood.Auto_attack")
			self.info.Target = target
			ProjectileManager:CreateTrackingProjectile(self.info)
		end
	end
end

function modifier_broodmother_innate_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_broodmother_innate_custom:GetModifierIgnoreMovespeedLimit()
	return self.ability.talents.has_h6 == 1 and 1 or 0
end

function modifier_broodmother_innate_custom:GetModifierMoveSpeed_Max()
	if self.parent:HasModifier("modifier_broodmother_insatiable_hunger_custom_rush_speed") then
		return
	end
	return self.ability.talents.has_h6 == 1 and self.ability.talents.h6_max_move_real or nil
end

function modifier_broodmother_innate_custom:GetModifierMoveSpeed_Limit()
	if self.parent:HasModifier("modifier_broodmother_insatiable_hunger_custom_rush_speed") then
		return
	end
	return self.ability.talents.has_h6 == 1 and self.ability.talents.h6_max_move_real or nil
end

function modifier_broodmother_innate_custom:GetModifierSlowResistance_Stacking()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_resist
end

modifier_broodmother_innate_custom_effect_cd = class(mod_hidden)

modifier_broodmother_innate_custom_attack = class(mod_hidden)
function modifier_broodmother_innate_custom_attack:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.h6_damage - 100
end

function modifier_broodmother_innate_custom_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_broodmother_innate_custom_attack:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end

modifier_broodmother_innate_custom_magic = class(mod_visible)
function modifier_broodmother_innate_custom_magic:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.has_r3 == 1 and self.ability.talents.r3_max or self.ability.talents.w3_max
	self.magic = self.ability.talents.r3_magic

	if not IsServer() then
		return
	end

	if self.ability.talents.has_w3 == 1 then
		for i = 1, 2 do
			self.parent:GenericParticle("particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", self)
		end
		self.damageTable = {
			victim = self.parent,
			ability = self.ability,
			attacker = self.caster,
			damage_type = self.ability.talents.w3_damage_type,
		}
		self.interval = self.ability.talents.w3_interval
		self:StartIntervalThink(self.interval - FrameTime())
	end

	self:OnRefresh()
end

function modifier_broodmother_innate_custom_magic:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_broodmother_innate_custom_magic:OnIntervalThink()
	if not IsServer() then
		return
	end
	local damage = (
		(self.ability.talents.w3_base + self.ability.talents.w3_damage * self.caster:GetMaxHealth()) / self.max
	) * self:GetStackCount()
	self.damageTable.damage = damage

	local real_damage = DoDamage(self.damageTable, "modifier_broodmother_web_3")

	local result = self.caster:CanLifesteal(self.parent)
	if result then
		self.caster:GenericHeal(
			real_damage * result * self.ability.talents.w3_heal,
			self.ability,
			true,
			"",
			"modifier_broodmother_web_3"
		)
	end

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Brood.Web_legendary_damage")
		local hit_effect = ParticleManager:CreateParticle(
			"particles/broodmother/bite_legendary_attack.vpcf",
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

		local dist = (self.parent:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D()
				<= self.ability.talents.w3_radius
			and self.caster:IsAlive()

		if not self.particle and dist then
			self.parent:EmitSound("Brood.Web_leash_start")
			self.particle = ParticleManager:CreateParticle(
				"particles/broodmother/web_silence_tether.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
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
				self.caster,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.caster:GetOrigin(),
				true
			)
			self:AddParticle(self.particle, false, false, -1, false, false)
		end

		if self.particle and not dist then
			ParticleManager:DestroyParticle(self.particle, false)
			ParticleManager:ReleaseParticleIndex(self.particle)
			self.particle = nil
		end
	end
end

function modifier_broodmother_innate_custom_magic:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_broodmother_innate_custom_magic:GetModifierMagicalResistanceBonus()
	if self.ability.talents.has_r3 == 0 then
		return
	end
	return self.magic * self:GetStackCount()
end