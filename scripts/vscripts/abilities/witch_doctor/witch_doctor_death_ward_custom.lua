--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_witch_doctor_death_ward_custom_tracker",
	"abilities/witch_doctor/witch_doctor_death_ward_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_death_ward_custom",
	"abilities/witch_doctor/witch_doctor_death_ward_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_death_ward_custom_caster",
	"abilities/witch_doctor/witch_doctor_death_ward_custom",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_witch_doctor_death_ward_custom_unit",
	"abilities/witch_doctor/witch_doctor_death_ward_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_death_ward_custom_bkb_cd",
	"abilities/witch_doctor/witch_doctor_death_ward_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_hero_6"
)
LinkLuaModifier(
	"modifier_witch_doctor_death_ward_custom_shard",
	"abilities/witch_doctor/witch_doctor_death_ward_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "Shard" }
)

witch_doctor_death_ward_custom = class({})
witch_doctor_death_ward_custom.talents = {}
witch_doctor_death_ward_custom.wards = {}

function witch_doctor_death_ward_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_witchdoctor/witchdoctor_ward_cast_staff_fire.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_witchdoctor/witchdoctor_ward_attack.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_witchdoctor/witchdoctor_ward_skull.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/ward_legendary_end.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/ward_damage_reduce.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/ward_root.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/ward_shard_cast.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/ward_shard_castb.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/ward_cleave.vpcf", context)
end

function witch_doctor_death_ward_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r1_damage = 0,
			r1_attack = 0,

			r2_duration = 0,
			r2_cd = 0,

			has_r3 = 0,
			r3_damage = 0,
			r3_heal = 0,
			r3_duration = caster:GetTalentValue("modifier_witch_doctor_deathward_3", "duration", true),
			r3_bva = caster:GetTalentValue("modifier_witch_doctor_deathward_3", "bva", true),
			r3_max = caster:GetTalentValue("modifier_witch_doctor_deathward_3", "max", true),

			has_r4 = 0,
			r4_cast = caster:GetTalentValue("modifier_witch_doctor_deathward_4", "cast", true),

			has_r7 = 0,
			r7_channel = caster:GetTalentValue("modifier_witch_doctor_deathward_7", "channel", true) / 100,
			r7_health = caster:GetTalentValue("modifier_witch_doctor_deathward_7", "health", true) / 100,
			r7_magic = caster:GetTalentValue("modifier_witch_doctor_deathward_7", "magic", true),
			r7_bva = caster:GetTalentValue("modifier_witch_doctor_deathward_7", "bva", true),
			r7_base = caster:GetTalentValue("modifier_witch_doctor_deathward_7", "base", true),
			r7_armor = caster:GetTalentValue("modifier_witch_doctor_deathward_7", "armor", true),

			h3_mana = 0,

			has_h6 = 0,
			h6_bkb_cd = caster:GetTalentValue("modifier_witch_doctor_hero_6", "bkb_cd", true),
			h6_damage_reduce = caster:GetTalentValue("modifier_witch_doctor_hero_6", "damage_reduce", true),
			h6_bkb = caster:GetTalentValue("modifier_witch_doctor_hero_6", "bkb", true),

			q1_speed_ward = 0,

			q2_range = 0,

			has_q7 = 0,
		}
	end

	if caster:HasTalent("modifier_witch_doctor_deathward_1") then
		self.talents.r1_damage = caster:GetTalentValue("modifier_witch_doctor_deathward_1", "damage") / 100
		self.talents.r1_attack = caster:GetTalentValue("modifier_witch_doctor_deathward_1", "attack")
	end

	if caster:HasTalent("modifier_witch_doctor_deathward_2") then
		self.talents.r2_duration = caster:GetTalentValue("modifier_witch_doctor_deathward_2", "duration")
		self.talents.r2_cd = caster:GetTalentValue("modifier_witch_doctor_deathward_2", "cd")
	end

	if caster:HasTalent("modifier_witch_doctor_deathward_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_witch_doctor_deathward_3", "damage") / 100
		self.talents.r3_heal = caster:GetTalentValue("modifier_witch_doctor_deathward_3", "heal") / 100
		caster:AddSpellEvent(self.tracker, true)
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_witch_doctor_deathward_3", type = 2, value = self.talents.r3_heal }
		)
	end

	if caster:HasTalent("modifier_witch_doctor_deathward_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_deathward_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_hero_3") then
		self.talents.h3_mana = caster:GetTalentValue("modifier_witch_doctor_hero_3", "mana") / 100
	end

	if caster:HasTalent("modifier_witch_doctor_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_witch_doctor_cask_1") then
		self.talents.q1_speed_ward = caster:GetTalentValue("modifier_witch_doctor_cask_1", "speed_ward")
	end

	if caster:HasTalent("modifier_witch_doctor_cask_2") then
		self.talents.q2_range = caster:GetTalentValue("modifier_witch_doctor_cask_2", "range")
	end

	if caster:HasTalent("modifier_witch_doctor_cask_7") then
		self.talents.has_q7 = 1
	end
end

function witch_doctor_death_ward_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "witch_doctor_death_ward", self)
end

function witch_doctor_death_ward_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_witch_doctor_death_ward_custom_tracker"
end

function witch_doctor_death_ward_custom:GetChannelTime()
	local k = self.talents.has_r7 == 1 and (1 + self.talents.r7_channel) or 1
	return ((self.channel or 0) + (self.talents.has_r4 == 1 and self.talents.r4_cast or 0)) * k
end

function witch_doctor_death_ward_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.r2_cd or 0)
end

function witch_doctor_death_ward_custom:GetDamage()
	return self.damage + self.talents.r1_damage * self.caster:GetAverageTrueAttackDamage(nil)
end

function witch_doctor_death_ward_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	self.ward = self:CreateWard(point)
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_witch_doctor_death_ward_custom_caster",
		{ ward = self.ward:entindex(), duration = self:GetChannelTime() }
	)
end

function witch_doctor_death_ward_custom:OnChannelFinish(bInterrupted)
	self.caster:RemoveModifierByName("modifier_witch_doctor_death_ward_custom_caster")
	if not bInterrupted then
		return
	end
	if not IsValid(self.ward) then
		return
	end
	self.ward:RemoveModifierByName("modifier_witch_doctor_death_ward_custom")
	self.ward = nil
end

function witch_doctor_death_ward_custom:OnProjectileHit_ExtraData(target, location, table)
	local particle = table.particle
	local ward = EntIndexToHScript(table.ward)

	if particle then
		ParticleManager:DestroyParticle(particle, false)
		ParticleManager:ReleaseParticleIndex(particle)
	end

	if not target then
		return
	end
	if not IsValid(ward) then
		return
	end

	local no_miss = RollPseudoRandomPercentage(self.bonus_accuracy, 5194, ward)
	local attacker = ward
	local fake = true
	if self.talents.has_r7 == 1 then
		attacker = self.caster
		fake = false
	end

	attacker.wd_ward_attack = ward
	attacker:PerformAttack(target, true, true, true, false, false, fake, no_miss, { attack = "wd_ward" })
	attacker.wd_ward_attack = nil
end

function witch_doctor_death_ward_custom:OnProjectileThink_ExtraData(vLocation, table)
	local particle = table.particle
	local target = EntIndexToHScript(table.target)
	if not IsValid(target) then
		return
	end
	if not particle then
		return
	end

	ParticleManager:SetParticleControl(
		particle,
		1,
		target:GetAttachmentOrigin(target:ScriptLookupAttachment("attach_hitloc"))
	)
end

function witch_doctor_death_ward_custom:CreateWard(point, source)
	local duration = self.duration + self.talents.r2_duration

	local ward = CreateUnitByName(
		"npc_dota_witch_doctor_death_ward_custom",
		point,
		true,
		self.caster,
		nil,
		self.caster:GetTeamNumber()
	)
	local new_model_name = "models/heroes/witchdoctor/witchdoctor_ward.vmdl"
	local model_pfx = wearables_system:GetUnitModelReplacement(self.caster, "npc_dota_witch_doctor_death_ward")
	if model_pfx then
		new_model_name = model_pfx
	end
	if new_model_name ~= "models/heroes/witchdoctor/witchdoctor_ward.vmdl" then
		ward:SetOriginalModel(new_model_name)
	end

	if source == "auto" then
		duration = self.talents.r3_duration
		ward.wd_r3 = true
	end

	if source == "shard" then
		if IsValid(self.caster.switcheroo_ability) then
			duration = self.caster.switcheroo_ability.duration
		end
	end

	ward:SetControllableByPlayer(self.caster:GetId(), false)
	ward:SetOwner(self.caster)
	FindClearSpaceForUnit(ward, point, false)
	ward.owner = self.caster
	ward.is_wd_ward = true
	ward:AddNewModifier(self.caster, self, "modifier_witch_doctor_death_ward_custom", { source = source })
	ward:AddNewModifier(self.caster, self, "modifier_witch_doctor_death_ward_custom_unit", { source = source })
	ward:AddNewModifier(self.caster, self, "modifier_kill", { duration = duration })

	return ward
end

modifier_witch_doctor_death_ward_custom = class(mod_hidden)
function modifier_witch_doctor_death_ward_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.has_r7 = self.ability.talents.has_r7
	self.radius = self.ability.attack_range_tooltip + self.ability.talents.q2_range

	if not IsServer() then
		return
	end
	self.ability.wards[self.parent] = true
	self.parent:AddOrderFilter(self)

	self.is_auto = false
	if table.source == "auto" then
		self.is_auto = true
	end
	if table.source == "shard" then
		self.is_shard = true
	end
	self:SetHasCustomTransmitterData(true)

	self.attack_count = 0
	self.forced_target = nil
	self.speed = self.parent:GetProjectileSpeed()
	self.source_attach = self.parent:GetAttachmentOrigin(self.parent:ScriptLookupAttachment("attach_attack1"))

	local skull_fx_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_witchdoctor/witchdoctor_ward_skull.vpcf",
		self
	)

	self.wardParticle = ParticleManager:CreateParticle(skull_fx_name, PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		self.wardParticle,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControl(self.wardParticle, 2, self.parent:GetAbsOrigin())
	self:AddParticle(self.wardParticle, false, false, -1, true, false)

	local ward_add_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_witchdoctor/witchdoctor_ward_ambient_effect_null.vpcf",
		self
	)

	if ward_add_pfx == "particles/econ/items/witch_doctor/wd_2021_cache/wd_2021_cache_death_ward.vpcf" then
		self.wardParticle_ambient_item = ParticleManager:CreateParticle(ward_add_pfx, PATTACH_POINT_FOLLOW, self.parent)
		ParticleManager:SetParticleControlEnt(
			self.wardParticle_ambient_item,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_attack1",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.wardParticle_ambient_item,
			7,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_candle_fx_01",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.wardParticle_ambient_item,
			8,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_candle_fx_02",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.wardParticle_ambient_item,
			9,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_candle_fx_03",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(self.wardParticle_ambient_item, false, false, -1, true, false)
	elseif ward_add_pfx == "particles/econ/items/witch_doctor/wd_voodoo_doc/wd_voodoo_doc_summons_ambient.vpcf" then
		self.wardParticle_ambient_item =
			ParticleManager:CreateParticle(ward_add_pfx, PATTACH_ABSORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControlEnt(
			self.wardParticle_ambient_item,
			6,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_flute",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(self.wardParticle_ambient_item, false, false, -1, true, false)
	end

	self.attack_projectile_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_witchdoctor/witchdoctor_ward_attack.vpcf",
		self
	)

	if self.has_r7 == 1 then
		self.parent:EmitSound("WD.Ward_legendary_loop")
		local health = self.ability.talents.r7_base + self.caster:GetMaxHealth() * self.ability.talents.r7_health
		self.parent:SetMaxHealth(health)
		self.parent:SetHealth(health)
		self.parent:SetPhysicalArmorBaseValue(self.ability.talents.r7_armor)
		self.parent:SetBaseMagicalResistanceValue(self.ability.talents.r7_magic)
	else
		if not self.is_auto and not self.is_shard then
			self.ability:EndCd()
		end
	end

	self.info = {
		EffectName = "",
		Ability = self.ability,
		iMoveSpeed = self.speed,
		Source = self.parent,
		bDodgeable = true,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
	}

	self:StartIntervalThink(0.1)
end

function modifier_witch_doctor_death_ward_custom:AddCustomTransmitterData()
	return {
		is_auto = self.is_auto and 1 or 0,
		is_shard = self.is_shard and 1 or 0,
	}
end

function modifier_witch_doctor_death_ward_custom:HandleCustomTransmitterData(data)
	self.is_auto = data.is_auto == 1
	self.is_shard = data.is_shard == 1
end

function modifier_witch_doctor_death_ward_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	local interval = 1 / self.parent:GetAttacksPerSecond(true)
	local target

	if not self.sound_init and self.has_r7 == 0 and not self.is_auto then
		self.sound_init = true
		self.parent:EmitSound("Hero_WitchDoctor.Death_WardBuild")
	end

	if
		IsValid(self.forced_target)
		and self.forced_target:IsAlive()
		and not self.forced_target:IsInvulnerable()
		and not self.forced_target:IsOutOfGame()
		and self.caster:CanEntityBeSeenByMyTeam(self.forced_target)
		and not self.forced_target:IsAttackImmune()
		and (self.forced_target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= self.radius
	then
		target = self.forced_target
	else
		self.forced_target = nil
	end

	if not target then
		target = self.parent:RandomTarget(
			self.radius,
			nil,
			DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE + DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE
		)
	end

	if target then
		local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
		vec.z = 0
		local particle = ParticleManager:CreateParticle(self.attack_projectile_name, PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, self.source_attach)
		ParticleManager:SetParticleControlForward(particle, 0, vec)
		ParticleManager:SetParticleControl(
			particle,
			1,
			target:GetAttachmentOrigin(target:ScriptLookupAttachment("attach_hitloc"))
		)
		ParticleManager:SetParticleControl(particle, 2, Vector(self.speed, 0, 0))

		self.info.Target = target
		self.info.ExtraData = {
			particle = particle,
			ward = self.parent:entindex(),
			target = target:entindex(),
		}
		ProjectileManager:CreateTrackingProjectile(self.info)

		if self.ability.talents.has_q7 == 1 and IsValid(self.caster.cask_ability) then
			self.caster.cask_ability:ProcLegendary(target, self.parent:entindex())
		end

		self.parent:EmitSound("Hero_WitchDoctor_Ward.Attack")
		if self.wardParticle then
			ParticleManager:SetParticleControlForward(self.wardParticle, 1, vec)
		end
		if target:IsHero() then
			self.forced_target = target
		end
		if target:IsRealHero() then
			AddFOWViewer(target:GetTeamNumber(), self.parent:GetAbsOrigin(), 50, 2, false)
		end
		if self.is_auto then
			self.attack_count = self.attack_count + 1
			if self.attack_count >= self.ability.talents.r3_max then
				self:Destroy()
				return
			end
		end
	end

	self:StartIntervalThink(interval)
end

function modifier_witch_doctor_death_ward_custom:OrderFilter(params)
	if params.order_type ~= DOTA_UNIT_ORDER_ATTACK_TARGET then
		return
	end
	if not params.target then
		return
	end

	local target = params.target
	if not IsValid(target) then
		return false
	end
	if not target:IsUnit() then
		return false
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return false
	end

	local error = nil
	if (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.radius then
		error = "witch_doctor_range"
	end

	if target:IsAttackImmune() or target:IsInvulnerable() then
		error = "witch_doctor_ghost"
	end

	if error then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetId()),
			"CreateIngameErrorMessage",
			{ message = error }
		)
		return false
	end

	self.forced_target = target
	return false
end

function modifier_witch_doctor_death_ward_custom:OnDestroy()
	if not IsServer() then
		return
	end

	self.ability.wards[self.parent] = nil

	local mod = self.caster:FindModifierByName("modifier_witch_doctor_death_ward_custom_caster")
	if mod and IsValid(mod.unit) and mod.unit == self.parent then
		self.caster:Interrupt()
	end

	if self.has_r7 == 1 then
		self.parent:StopSound("WD.Ward_legendary_loop")
	else
		if not self.is_auto and not self.is_shard then
			self.ability:StartCd()
		end
		self.parent:StopSound("Hero_WitchDoctor.Death_WardBuild")
	end

	self.parent:EmitSound("WD.Ward_legendary_end")
	local effect =
		ParticleManager:CreateParticle("particles/witch_doctor/ward_legendary_end.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	self.parent:AddNoDraw()
	self.parent:Kill(nil, nil)
end

function modifier_witch_doctor_death_ward_custom:CheckState()
	local result = {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_CANNOT_BE_MOTION_CONTROLLED] = true,
	}
	if self.has_r7 == 0 then
		result[MODIFIER_STATE_INVULNERABLE] = true
		result[MODIFIER_STATE_OUT_OF_GAME] = true
	else
		result[MODIFIER_STATE_DEBUFF_IMMUNE] = true
	end

	if self.is_auto or self.is_shard or self.has_r7 == 0 then
		result[MODIFIER_STATE_NO_HEALTH_BAR] = true
		result[MODIFIER_STATE_UNTARGETABLE] = true
	end

	return result
end

function modifier_witch_doctor_death_ward_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_witch_doctor_death_ward_custom:GetOverrideAnimation()
	return ACT_DOTA_IDLE
end

function modifier_witch_doctor_death_ward_custom:GetAbsoluteNoDamagePhysical()
	return (self.is_auto or self.is_shard) and 1 or 0
end

function modifier_witch_doctor_death_ward_custom:GetAbsoluteNoDamageMagical()
	return (self.is_auto or self.is_shard) and 1 or 0
end

function modifier_witch_doctor_death_ward_custom:GetAbsoluteNoDamagePure()
	return (self.is_auto or self.is_shard) and 1 or 0
end

function modifier_witch_doctor_death_ward_custom:GetModifierDisableTurning()
	return 1
end

function modifier_witch_doctor_death_ward_custom:GetModifierAttackRangeBonus()
	return self.radius
end

function modifier_witch_doctor_death_ward_custom:GetModifierAttackSpeedBonus_Constant()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	return self.ability.talents.q1_speed_ward
end

modifier_witch_doctor_death_ward_custom_unit = class(mod_hidden)
function modifier_witch_doctor_death_ward_custom_unit:RemoveOnDeath()
	return false
end
function modifier_witch_doctor_death_ward_custom_unit:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.bva = self.ability.bva
	if self.ability.talents.has_r7 == 1 then
		self.bva = self.ability.talents.r7_bva
	end

	if not IsServer() then
		return
	end
	self.damage_k = 1

	if table.source == "auto" then
		self.damage_k = self.ability.talents.r3_damage
		self.bva = self.ability.talents.r3_bva
		self.is_wd_ward_auto = true
	end
	if table.source == "shard" then
		self.is_wd_ward_shard = true
		if IsValid(self.caster.switcheroo_ability) then
			self.bva = self.caster.switcheroo_ability.bva
		end
	end

	self.parent:AddLifesteal(self, {
		name = "modifier_witch_doctor_deathward_3",
		heal_unit = self.caster,
		value = function()
			return self.ability.talents.r3_heal
		end,
	})
	self.parent:AddLifesteal(self, {
		name = "modifier_witch_doctor_hero_3",
		heal_unit = self.caster,
		heal = false,
		proc = "LifestealMana",
		value = function()
			return self.ability.talents.h3_mana
		end,
	})
end

function modifier_witch_doctor_death_ward_custom_unit:LifestealMana(params, mana, target)
	target:GiveMana(mana)
end

function modifier_witch_doctor_death_ward_custom_unit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE,
		MODIFIER_PROPERTY_BASE_ATTACK_TIME_CONSTANT,
	}
end

function modifier_witch_doctor_death_ward_custom_unit:GetModifierBaseAttack_BonusDamage(params)
	if not IsServer() then
		return
	end
	return self.ability:GetDamage() * self.damage_k
end

function modifier_witch_doctor_death_ward_custom_unit:GetModifierBaseAttackTimeConstant()
	return self.bva
end

modifier_witch_doctor_death_ward_custom_tracker = class(mod_hidden)
function modifier_witch_doctor_death_ward_custom_tracker:RemoveOnDeath()
	return false
end
function modifier_witch_doctor_death_ward_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.deathward_ability = self.ability
	self.parent.deathward_legendary_ability = self.parent:FindAbilityByName("witch_doctor_death_ward_custom_legendary")
	self.parent.switcheroo_ability = self.parent:FindAbilityByName("witch_doctor_voodoo_switcheroo_custom")

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.bva = self.ability:GetSpecialValueFor("bva")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.attack_range_tooltip = self.ability:GetSpecialValueFor("attack_range_tooltip")
	self.ability.bonus_accuracy = self.ability:GetSpecialValueFor("bonus_accuracy")
	self.ability.channel = self.ability:GetSpecialValueFor("channel")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")

	self.parent:AddProc(self, { land = true, illusion = true })
end

function modifier_witch_doctor_death_ward_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_witch_doctor_death_ward_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PROCATTACK_BONUS_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE,
	}
end

function modifier_witch_doctor_death_ward_custom_tracker:GetModifierPreAttack_BonusDamage()
	return self.ability.talents.r1_attack
end

function modifier_witch_doctor_death_ward_custom_tracker:GetModifierOverrideAttackDamage()
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not self.parent.wd_ward_attack then
		return
	end
	return self.parent.wd_ward_attack:GetAverageTrueAttackDamage(nil)
end

function modifier_witch_doctor_death_ward_custom_tracker:GetModifierProcAttack_BonusDamage_Physical(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r7 == 0 then
		return
	end
	if not self.parent.wd_ward_attack then
		return
	end

	self.parent:LandProcs(params)
	self:DealDamage(
		params.target,
		self.parent.wd_ward_attack,
		self.parent.proc_records and self.parent.proc_records[params.record]
	)
	return -params.damage
end

function modifier_witch_doctor_death_ward_custom_tracker:GetProcChance()
	return 100
end

function modifier_witch_doctor_death_ward_custom_tracker:AttackProc(params, name)
	if self.ability.talents.has_r7 == 1 then
		return
	end
	local attacker = params.attacker
	local target = params.target

	if not attacker.owner then
		return
	end
	if attacker.owner ~= self.parent then
		return
	end
	if not attacker:HasModifier("modifier_witch_doctor_death_ward_custom_unit") then
		return
	end

	self:DealDamage(target, attacker, params.procs)
end

function modifier_witch_doctor_death_ward_custom_tracker:DealDamage(target, attacker, procs)
	if not IsServer() then
		return
	end
	local damage = attacker:GetAverageTrueAttackDamage(nil)

	if self.ability.talents.has_r7 == 1 then
		local crit
		for _, mod in pairs(self.parent:FindAllModifiersByName("modifier_item_greater_crit_custom")) do
			crit = mod:GetModifierPreAttack_CriticalStrike({ target = target })
			if crit then
				target:EmitSound("DOTA_Item.Daedelus.Crit")
				break
			end
		end
		if not crit then
			for _, mod in pairs(self.parent:FindAllModifiersByName("modifier_item_lesser_crit_custom")) do
				crit = mod:GetModifierPreAttack_CriticalStrike({ target = target })
				if crit then
					break
				end
			end
		end
		if crit then
			damage = damage * crit
			target:SendNumber(2, damage)
		end
	end

	local damage_ability = nil
	if attacker.wd_r3 then
		damage_ability = "modifier_witch_doctor_deathward_3"
	end

	local damageTable = {
		victim = target,
		attacker = attacker,
		ability = self.ability,
		damage_type = DAMAGE_TYPE_PURE,
		damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION + DOTA_DAMAGE_FLAG_MAGIC_AUTO_ATTACK,
	}
	local targets = self.parent:FindTargets(self.ability.radius, target:GetAbsOrigin())

	for _, aoe_target in pairs(targets) do
		damageTable.victim = aoe_target
		damageTable.damage = damage

		local real_damage = DoDamage(damageTable, damage_ability)
		if self.parent:GetQuest() == "WitchDoctor.Quest_8" and aoe_target:IsRealHero() then
			self.parent:UpdateQuest(real_damage)
		end
	end

	if #targets > 1 then
		local particle =
			ParticleManager:CreateParticle("particles/witch_doctor/ward_cleave.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(particle)
	end

	if IsValid(self.parent.cask_ability) then
		self.parent.cask_ability:ProcAttack(target, procs)
	end

	target:EmitSound("Hero_WitchDoctor_Ward.ProjectileImpact")
end

function modifier_witch_doctor_death_ward_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r3 == 0 then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if IsValid(self.ability.auto_ward) and self.ability.auto_ward:IsAlive() then
		return
	end

	local pos = self.parent:GetAbsOrigin() + self.parent:GetForwardVector() * 250
	local point = RotatePosition(self.parent:GetAbsOrigin(), QAngle(0, -70 + RandomInt(0, 140), 0), pos)

	self.ability.auto_ward = self.ability:CreateWard(point, "auto")
end

modifier_witch_doctor_death_ward_custom_caster = class(mod_hidden)
function modifier_witch_doctor_death_ward_custom_caster:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	if not IsServer() then
		return
	end
	self.unit = EntIndexToHScript(table.ward)

	if self.ability.talents.has_h6 == 1 then
		self.parent:GenericParticle("particles/witch_doctor/ward_damage_reduce.vpcf", self)
		if not self.parent:HasModifier("modifier_witch_doctor_death_ward_custom_bkb_cd") then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_generic_debuff_immune",
				{ duration = self.ability.talents.h6_bkb, effect = 2 }
			)
			if self.ability.talents.has_r7 == 1 then
				self.parent:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_witch_doctor_death_ward_custom_bkb_cd",
					{ duration = self.ability.talents.h6_bkb_cd }
				)
			end
		end
	end

	local ambient_particle_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_witchdoctor/witchdoctor_ward_cast_staff_fire.vpcf",
		self
	)
	self.parent:GenericParticle(ambient_particle_name, self, true)

	if self.ability.talents.has_r7 == 0 then
		return
	end
	self:StartIntervalThink(0.1)
end

function modifier_witch_doctor_death_ward_custom_caster:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("WD.Ward_legendary_cast")
	self:StartIntervalThink(-1)
end

function modifier_witch_doctor_death_ward_custom_caster:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("WD.Ward_legendary_cast")
end

function modifier_witch_doctor_death_ward_custom_caster:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
	}
end

function modifier_witch_doctor_death_ward_custom_caster:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_h6 == 0 then
		return
	end
	return self.ability.talents.h6_damage_reduce
end

modifier_witch_doctor_death_ward_custom_bkb_cd = class(mod_cd)
function modifier_witch_doctor_death_ward_custom_bkb_cd:GetTexture()
	return "buffs/witch_doctor/hero_6"
end

witch_doctor_death_ward_custom_legendary = class({})
function witch_doctor_death_ward_custom_legendary:CreateTalent()
	if not self:IsHidden() then
		return
	end
	self.caster:SwapAbilities("witch_doctor_death_ward_custom", "witch_doctor_death_ward_custom_legendary", false, true)
end

function witch_doctor_death_ward_custom_legendary:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "witch_doctor_death_ward", self)
end

function witch_doctor_death_ward_custom_legendary:GetChannelTime()
	if not IsValid(self.caster.deathward_ability) then
		return 0
	end
	return self.caster.deathward_ability:GetChannelTime()
end

function witch_doctor_death_ward_custom_legendary:GetAbilityChargeRestoreTime(level)
	if not IsValid(self.caster.deathward_ability) then
		return 0
	end
	return self.caster.deathward_ability:GetCooldown(self:GetLevel())
end

function witch_doctor_death_ward_custom_legendary:OnSpellStart()
	local point = self:GetCursorPosition()
	local ability = self.caster.deathward_ability
	if not ability then
		return
	end

	self.ward = ability:CreateWard(point)
	self.caster:AddNewModifier(
		self.caster,
		ability,
		"modifier_witch_doctor_death_ward_custom_caster",
		{ ward = self.ward:entindex(), duration = self:GetChannelTime() }
	)
end

function witch_doctor_death_ward_custom_legendary:OnChannelFinish(bInterrupted)
	self.caster:RemoveModifierByName("modifier_witch_doctor_death_ward_custom_caster")
	if not bInterrupted then
		return
	end
	if not IsValid(self.ward) then
		return
	end
	self.ward:RemoveModifierByName("modifier_witch_doctor_death_ward_custom")
	self.ward = nil
end

witch_doctor_voodoo_switcheroo_custom = class({})
function witch_doctor_voodoo_switcheroo_custom:Init()
	if not self:GetCaster() then
		return
	end
	self.caster = self:GetCaster()

	self.duration = self:GetLevelSpecialValueFor("duration", 1)
	self.bva = self:GetLevelSpecialValueFor("bva", 1)
	self.AbilityCastRange = self:GetLevelSpecialValueFor("AbilityCastRange", 1)
end

function witch_doctor_voodoo_switcheroo_custom:GetCastRange(vLocation, hTarget)
	if IsClient() then
		return self.BaseClass.GetCastRange(self, vLocation, hTarget)
	end
	return 99999
end

function witch_doctor_voodoo_switcheroo_custom:GetManaCost(level)
	if self.caster:HasModifier("modifier_witch_doctor_death_ward_custom_shard") then
		return 0
	end
	return self.BaseClass.GetManaCost(self, level)
end

function witch_doctor_voodoo_switcheroo_custom:GetBehavior()
	if self.caster:HasModifier("modifier_witch_doctor_death_ward_custom_shard") then
		return DOTA_ABILITY_BEHAVIOR_IMMEDIATE
			+ DOTA_ABILITY_BEHAVIOR_NO_TARGET
			+ DOTA_ABILITY_BEHAVIOR_IGNORE_SILENCE_CUSTOM
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
end

function witch_doctor_voodoo_switcheroo_custom:OnSpellStart()
	local ability = self.caster.deathward_ability
	if not IsValid(ability) then
		return
	end
	if not ability:IsTrained() then
		return
	end

	local mod = self.caster:FindModifierByName("modifier_witch_doctor_death_ward_custom_shard")
	if mod then
		mod:Destroy()
		return
	end

	local point = self:GetCursorPosition()
	local target = self:GetCursorTarget()

	if (target and target == self.caster) or self.caster:IsLeashed() or self.caster:IsRooted() then
		point = self.caster:GetAbsOrigin()
	else
		local max_dist = self.AbilityCastRange + self.caster:GetCastRangeBonus()
		local dir = point - self.caster:GetAbsOrigin()

		if point == self.caster:GetAbsOrigin() then
			point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
		end

		if dir:Length2D() > max_dist then
			point = self.caster:GetAbsOrigin() + dir:Normalized() * max_dist
		end
	end

	self.caster:Teleport(point, true, "particles/witch_doctor/ward_shard_cast.vpcf")

	mod = self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_witch_doctor_death_ward_custom_shard",
		{ duration = self.duration }
	)
	local ward = ability:CreateWard(point, "shard")

	if mod then
		mod.ward = ward
	end
end

modifier_witch_doctor_death_ward_custom_shard = class(mod_visible)
function modifier_witch_doctor_death_ward_custom_shard:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	self.ability:EndCd()
	self.ability:SetActivated(true)
	self.ability:StartCooldown(0.2)

	self.parent:AddNoDraw()
	self.parent:NoDraw(self)
	self.parent:EmitSound("WD.Ward_shard_cast")
end

function modifier_witch_doctor_death_ward_custom_shard:CheckState()
	return {
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_MUTED] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

function modifier_witch_doctor_death_ward_custom_shard:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:StopSound("WD.Ward_shard_cast")

	if IsValid(self.ward) then
		self.parent:SetAbsOrigin(self.ward:GetAbsOrigin())
		self.ward:RemoveModifierByName("modifier_witch_doctor_death_ward_custom")
	end

	self.ability:StartCd()
	self.parent:RemoveNoDraw()
	self.parent:GenericParticle("particles/witch_doctor/ward_shard_castb.vpcf")
end