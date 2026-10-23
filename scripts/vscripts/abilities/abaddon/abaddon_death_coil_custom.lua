--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_legendary_unit",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_cd",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_abaddon_hero_4" }
)
LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_tracker",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_leash",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_hero_4"
)
LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_move",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_mist_4"
)
LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_unslow",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_scepter_proc",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_auto",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_abaddon_death_coil_custom_slow",
	"abilities/abaddon/abaddon_death_coil_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_abaddon_mist_3"
)

abaddon_death_coil_custom = class({})
abaddon_death_coil_custom.talents = {}

function abaddon_death_coil_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_death_coil.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_death_coil_abaddon.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_legendary_heal.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_mist_coil_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_abaddon/abaddon_curse_frostmourne_debuff.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_legendary_area.vpcf", context)
	PrecacheResource("particle", "particles/shrine/capture_point_ring_clock_overthrow.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_legendary_casti.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_proje.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_legendary_cast.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_leash.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_speed.vpcf", context)
	PrecacheResource("particle", "particles/abaddon/coil_cdr.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_speed.vpcf", context)
end

function abaddon_death_coil_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q1_damage = 0,
			q1_spell = 0,

			q2_cd = 0,
			q2_heal = 0,

			has_q3 = 0,
			q3_chance = 0,
			q3_multi = caster:GetTalentValue("modifier_abaddon_mist_3", "multi", true),
			q3_duration = caster:GetTalentValue("modifier_abaddon_mist_3", "duration", true),
			q3_slow = caster:GetTalentValue("modifier_abaddon_mist_3", "slow", true),
			q3_delay = caster:GetTalentValue("modifier_abaddon_mist_3", "delay", true),

			has_q4 = 0,
			q4_cd_items = caster:GetTalentValue("modifier_abaddon_mist_4", "cd_items", true),
			q4_move = caster:GetTalentValue("modifier_abaddon_mist_4", "move", true),
			q4_duration = caster:GetTalentValue("modifier_abaddon_mist_4", "duration", true),

			has_q7 = 0,
			q7_damage = caster:GetTalentValue("modifier_abaddon_mist_7", "damage", true) / 100,
			q7_range = caster:GetTalentValue("modifier_abaddon_mist_7", "range", true),
			q7_duration = caster:GetTalentValue("modifier_abaddon_mist_7", "duration", true),
			q7_timer = caster:GetTalentValue("modifier_abaddon_mist_7", "timer", true),
			q7_heal = caster:GetTalentValue("modifier_abaddon_mist_7", "heal", true) / 100,
			q7_radius = caster:GetTalentValue("modifier_abaddon_mist_7", "radius", true),

			has_h4 = 0,
			h4_max_dist = caster:GetTalentValue("modifier_abaddon_hero_4", "max_dist", true),
			h4_range = caster:GetTalentValue("modifier_abaddon_hero_4", "range", true),
			h4_talent_cd = caster:GetTalentValue("modifier_abaddon_hero_4", "talent_cd", true),
			h4_leash = caster:GetTalentValue("modifier_abaddon_hero_4", "leash", true),
		}

		self.thinkers = {}
	end

	if caster:HasTalent("modifier_abaddon_mist_1") then
		self.talents.q1_damage = caster:GetTalentValue("modifier_abaddon_mist_1", "damage") / 100
		self.talents.q1_spell = caster:GetTalentValue("modifier_abaddon_mist_1", "spell")
	end

	if caster:HasTalent("modifier_abaddon_mist_2") then
		self.talents.q2_cd = caster:GetTalentValue("modifier_abaddon_mist_2", "cd")
		self.talents.q2_heal = caster:GetTalentValue("modifier_abaddon_mist_2", "heal") / 100
		caster:AddLifesteal(self.tracker, { name = "modifier_abaddon_mist_2", type = 1, value = self.talents.q2_heal })
	end

	if caster:HasTalent("modifier_abaddon_mist_3") then
		self.talents.has_q3 = 1
		self.talents.q3_chance = caster:GetTalentValue("modifier_abaddon_mist_3", "chance")
	end

	if caster:HasTalent("modifier_abaddon_mist_4") then
		self.talents.has_q4 = 1
	end

	if caster:HasTalent("modifier_abaddon_mist_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_abaddon_hero_4") then
		self.talents.has_h4 = 1
	end
end

function abaddon_death_coil_custom:CreateTalent(name)
	self:ToggleAutoCast()
end

function abaddon_death_coil_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "abaddon_death_coil", self)
end

function abaddon_death_coil_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_abaddon_death_coil_custom_tracker"
end

function abaddon_death_coil_custom:GetBehavior()
	local bonus = 0
	if self.talents.has_h4 == 1 then
		bonus = DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_AOE + bonus
end

function abaddon_death_coil_custom:CastFilterResultTarget(target)
	local team = DOTA_UNIT_TARGET_TEAM_ENEMY
	if not IsSoloMode() then
		team = DOTA_UNIT_TARGET_TEAM_BOTH
	end
	if target == self.caster then
		return UF_FAIL_CUSTOM
	end
	return UnitFilter(
		target,
		team,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_NONE,
		self.caster:GetTeamNumber()
	)
end

function abaddon_death_coil_custom:GetCustomCastErrorTarget(hTarget)
	return "#dota_hud_error_cant_cast_on_self"
end

function abaddon_death_coil_custom:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) * (1 + (self.caster:HasScepter() and self.scepter_cast or 0))
end

function abaddon_death_coil_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.q2_cd or 0)
end

function abaddon_death_coil_custom:GetAOERadius()
	return self.effect_radius or 0
end

function abaddon_death_coil_custom:GetSelfDamage()
	return (self.target_damage or 0) * (self.self_damage or 0)
end

function abaddon_death_coil_custom:GetHealthCost(level)
	if IsServer() then
		return
	end
	return self:GetSelfDamage()
end

function abaddon_death_coil_custom:GetProjectile()
	return wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_abaddon/abaddon_death_coil.vpcf",
		self
	)
end

function abaddon_death_coil_custom:OnSpellStart(new_target, damage_ability)
	local target = self:GetCursorTarget()
	local is_scepter = 0
	local double = 0
	local pull = 0

	if new_target then
		target = new_target
		if damage_ability == "scepter" then
			is_scepter = 1
		end
	end

	if not new_target then
		if self.talents.has_q4 == 1 then
			self:ProcMove()
			self.caster:CdItems(self.talents.q4_cd_items, "modifier_abaddon_mist_4")
		end
		if self.talents.has_q3 == 1 then
			local chance = self.talents.q3_chance
				* (self.caster:HasModifier("modifier_abaddon_aphotic_shield_custom") and self.talents.q3_multi or 1)
			local index = self.caster:HasModifier("modifier_abaddon_aphotic_shield_custom") and 1872 or 1873

			if RollPseudoRandomPercentage(chance, index, self.caster) then
				self.caster:AddNewModifier(
					self.caster,
					self,
					"modifier_abaddon_death_coil_custom_auto",
					{ target = target:entindex() }
				)
			end
		end
		if
			self.talents.has_h4 == 1
			and self:GetAutoCastState()
			and not target:HasModifier("modifier_abaddon_death_coil_custom_cd")
		then
			pull = 1
		end
		DoDamage({
			victim = self.caster,
			attacker = self.caster,
			damage = self:GetSelfDamage(),
			damage_type = DAMAGE_TYPE_PURE,
			damage_flags = DOTA_DAMAGE_FLAG_NON_LETHAL
				+ DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION
				+ DOTA_DAMAGE_FLAG_NO_DAMAGE_MULTIPLIERS,
			ability = self,
		})
	end

	if damage_ability and damage_ability == "modifier_abaddon_mist_3" then
		double = 1
	end

	local info = {
		Source = self.caster,
		Ability = self,
		EffectName = self:GetProjectile(),
		iMoveSpeed = self.missile_speed,
		Target = target,
		bDodgeable = pull == 0,
		ExtraData = { double = double, heal = 0, pull = pull, is_scepter = is_scepter },
	}
	ProjectileManager:CreateTrackingProjectile(info)

	self.caster:GenericParticle("particles/units/heroes/hero_abaddon/abaddon_death_coil_abaddon.vpcf")
	self.caster:EmitSound("Hero_Abaddon.DeathCoil.Cast")
end

function abaddon_death_coil_custom:OnProjectileHit_ExtraData(target, location, table)
	if not target then
		return
	end
	local is_enemy = self.caster:GetTeamNumber() ~= target:GetTeamNumber()

	if is_enemy and table.is_scepter == 0 then
		if target:IsInvulnerable() or target:TriggerSpellAbsorb(self) then
			return
		end
	end

	local ability = nil
	local real_damage = 0
	local damage_k = 1

	if table.heal and table.heal == 1 then
		ability = "modifier_abaddon_mist_7"
		damage_k = self.talents.q7_damage
	else
		if self.caster:HasScepter() and is_enemy then
			self.caster:AddNewModifier(self.caster, self, "modifier_abaddon_death_coil_custom_scepter_proc", {})
			self.caster:PerformAttack(target, true, true, true, true, false, false, true)
			self.caster:RemoveModifierByName("modifier_abaddon_death_coil_custom_scepter_proc")
		end
	end

	local target_damage = self.target_damage + self.caster:GetIntellect(false) * self.talents.q1_damage

	if table.double and table.double == 1 then
		ability = "modifier_abaddon_mist_3"
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_abaddon_death_coil_custom_slow",
			{ duration = self.talents.q3_duration }
		)
	end

	if table.is_scepter and table.is_scepter == 1 and IsValid(self.caster.aphotic_ability) then
		ability = "scepter"
		target_damage = target_damage * self.caster.aphotic_ability.scepter_damage
	end

	if is_enemy then
		local damageTable = {
			attacker = self.caster,
			damage = target_damage * damage_k,
			damage_type = DAMAGE_TYPE_MAGICAL,
			ability = self,
		}

		for _, aoe_target in pairs(self.caster:FindTargets(self.effect_radius, target:GetAbsOrigin())) do
			if table.heal == 0 or aoe_target == target then
				damageTable.victim = aoe_target
				real_damage = DoDamage(damageTable, ability)
				local effect_cast = ParticleManager:CreateParticle(
					"particles/units/heroes/hero_abaddon/abaddon_mist_coil_buff.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					aoe_target
				)
				ParticleManager:DestroyParticle(effect_cast, false)
				ParticleManager:ReleaseParticleIndex(effect_cast)

				if IsValid(self.caster.aphotic_ability) then
					self.caster.aphotic_ability:AddBurn(aoe_target)
				end
			end
		end
	else
		target:GenericHeal(target_damage, self)
	end

	if table.heal == 1 and real_damage ~= 0 then
		local result = self.caster:CanLifesteal(target)
		if result then
			self.caster:GenericHeal(
				result * real_damage * self.talents.q7_heal,
				self,
				true,
				"particles/abaddon/coil_legendary_heal.vpcf",
				"modifier_abaddon_mist_7"
			)
		end
	end

	target:EmitSound("Hero_Abaddon.DeathCoil.Target")

	if table.pull == 1 and is_enemy then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_abaddon_death_coil_custom_cd",
			{ duration = self.talents.h4_talent_cd }
		)
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_abaddon_death_coil_custom_leash",
			{ duration = self.talents.h4_leash * (1 - target:GetStatusResistance()) }
		)

		local dir = (self.caster:GetAbsOrigin() - target:GetAbsOrigin()):Normalized()
		local point = self.caster:GetAbsOrigin() - dir * 50
		local distance = (point - target:GetAbsOrigin()):Length2D()
		local max_dist = self.talents.h4_max_dist

		distance = math.min(max_dist, math.max(40, distance))
		point = target:GetAbsOrigin() + dir * distance

		local mod = target:AddNewModifier(self.caster, self, "modifier_generic_arc", {
			target_x = point.x,
			target_y = point.y,
			distance = distance,
			duration = 0.3,
			height = 0,
			fix_end = false,
			isStun = false,
			activity = ACT_DOTA_FLAIL,
		})

		if mod then
			target:GenericParticle("particles/units/heroes/hero_abaddon/abaddon_curse_frostmourne_debuff.vpcf", mod)
		end
	end

	if table.heal == 1 then
		return
	end
	if self.talents.has_q7 == 0 then
		return
	end
	if not is_enemy then
		return
	end

	local range = self.talents.q7_range
	local vec
	local point
	local count = 0

	repeat
		vec = RandomVector(range)
		count = count + 1
		point = GetGroundPosition((target:GetAbsOrigin() + vec), nil)
	until self:CheckPos(point) or count >= 20

	local unit =
		CreateUnitByName("npc_dota_templar_assassin_psionic_trap", point, false, nil, nil, self.caster:GetTeamNumber())
	unit:AddNewModifier(
		self.caster,
		self,
		"modifier_abaddon_death_coil_custom_legendary_unit",
		{ target = target:entindex() }
	)

	local projectile_speed = self.missile_speed
	local projectile_name = self:GetProjectile()

	local info = {
		Source = target,
		Ability = self,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_HITLOCATION,

		EffectName = projectile_name,
		iMoveSpeed = projectile_speed,
		bDodgeable = true,
		Target = unit,
		ExtraData = { double = 0, heal = 0, pull = 0, is_scepter = 0 },
	}

	target:EmitSound("Hero_Abaddon.DeathCoil.Cast")
	ProjectileManager:CreateTrackingProjectile(info)
end

function abaddon_death_coil_custom:CheckPos(point)
	if not IsServer() then
		return
	end

	local radius = self.talents.q7_radius + 100

	for _, index in pairs(self.thinkers) do
		local unit = EntIndexToHScript(index)
		if IsValid(unit) then
			if (unit:GetAbsOrigin() - point):Length2D() <= radius then
				return false
			end
		end
	end

	return true
end

function abaddon_death_coil_custom:ProcMove(unslow)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_q4 == 0 then
		return
	end

	self.caster:RemoveModifierByName("modifier_abaddon_death_coil_custom_move")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_abaddon_death_coil_custom_move",
		{ duration = self.talents.q4_duration }
	)
	if unslow then
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_abaddon_death_coil_custom_unslow",
			{ duration = self.talents.q4_duration }
		)
	end
end

modifier_abaddon_death_coil_custom_legendary_unit = class(mod_hidden)
function modifier_abaddon_death_coil_custom_legendary_unit:OnCreated(params)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.point = self.parent:GetAbsOrigin()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.target = EntIndexToHScript(params.target)
	self.launch = false

	self.parent:EmitSound("Abaddon.Mist_legendary_loop")

	table.insert(self.ability.thinkers, self.parent:entindex())

	self.parent:AddNoDraw()
	self.duration = self.ability.talents.q7_duration
	self.radius = self.ability.talents.q7_radius
	self.max_timer = self.ability.talents.q7_timer - FrameTime()
	self.timer = 0

	local range = self.ability.talents.q7_range
	local speed = self.ability.missile_speed
	local time = range / speed
	self.flight = true

	self.interval = 0.1
	self:StartIntervalThink(time)
end

function modifier_abaddon_death_coil_custom_legendary_unit:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true,
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
	}
end

function modifier_abaddon_death_coil_custom_legendary_unit:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.flight == true then
		self.flight = false

		self:SetDuration(self.duration, true)
		self.parent:EmitSound("Abaddon.Mist_legendary_start")

		self.particle =
			ParticleManager:CreateParticle("particles/abaddon/coil_legendary_area.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(self.particle, 0, self.point)
		self:AddParticle(self.particle, false, false, -1, false, false)
		self:StartIntervalThink(self.interval)
		return
	end

	if not IsValid(self.target) or (not self.target:IsAlive() and not self.target:IsReincarnating()) then
		self:Destroy()
		return
	end

	AddFOWViewer(self.target:GetTeamNumber(), self.point, self.radius, 0.1, false)

	if (self.target:GetAbsOrigin() - self.point):Length2D() > self.radius then
		self.timer = 0
	else
		self.timer = self.timer + self.interval
		if self.timer >= self.max_timer then
			self:Destroy()
			return
		end
	end
end

function modifier_abaddon_death_coil_custom_legendary_unit:OnDestroy()
	if not IsServer() then
		return
	end

	EmitSoundOnLocationWithCaster(self.point, "Abaddon.Mist_legendary_end", self.caster)
	self.parent:StopSound("Abaddon.Mist_legendary_loop")

	local ground =
		ParticleManager:CreateParticle("particles/abaddon/coil_legendary_casti.vpcf", PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(ground, 0, self.point)
	ParticleManager:ReleaseParticleIndex(ground)

	if self.launch == true and IsValid(self.target) and self.target:IsAlive() then
		local projectile_speed = self.ability.missile_speed

		local particle = ParticleManager:CreateParticle("particles/abaddon/coil_proje.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, self.point)
		ParticleManager:SetParticleControl(particle, 1, self.point)
		ParticleManager:ReleaseParticleIndex(particle)

		local projectile_name = self.ability:GetProjectile()

		local info = {
			Source = self.parent,
			Ability = self.ability,
			iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_HITLOCATION,

			EffectName = projectile_name,
			iMoveSpeed = projectile_speed * 1.3,
			bDodgeable = false,
			Target = self.target,
			ExtraData = { double = 0, heal = 1, pull = 0, is_scepter = 0 },
		}

		self.parent:EmitSound("Hero_Abaddon.DeathCoil.Cast")
		ProjectileManager:CreateTrackingProjectile(info)
	end

	for i, index in pairs(self.ability.thinkers) do
		if index == self.parent:entindex() then
			table.remove(self.ability.thinkers, i)
			break
		end
	end

	UTIL_Remove(self.parent)
end

modifier_abaddon_death_coil_custom_tracker = class(mod_hidden)
function modifier_abaddon_death_coil_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.mist_ability = self.ability
	self.parent.mist_legendary_ability = self.parent:FindAbilityByName("abaddon_death_coil_custom_legendary")

	if IsValid(self.parent.mist_legendary_ability) then
		if IsServer() and not self.parent.mist_legendary_ability:IsTrained() then
			self.parent.mist_legendary_ability:SetLevel(1)
		end
		self.parent.mist_legendary_ability:UpdateTalents()
	end

	self.ability.self_damage = self.ability:GetSpecialValueFor("self_damage") / 100
	self.ability.missile_speed = self.ability:GetSpecialValueFor("missile_speed")
	self.ability.target_damage = self.ability:GetSpecialValueFor("target_damage")
	self.ability.heal_amount = self.ability:GetSpecialValueFor("heal_amount")
	self.ability.effect_radius = self.ability:GetSpecialValueFor("effect_radius")
	self.ability.scepter_cast = self.ability:GetSpecialValueFor("scepter_cast") / 100
	self.ability.scepter_damage = self.ability:GetSpecialValueFor("scepter_damage")
end

function modifier_abaddon_death_coil_custom_tracker:OnRefresh()
	self.ability.target_damage = self.ability:GetSpecialValueFor("target_damage")
	self.ability.heal_amount = self.ability:GetSpecialValueFor("heal_amount")
end

function modifier_abaddon_death_coil_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_abaddon_death_coil_custom_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.q1_spell
end

function modifier_abaddon_death_coil_custom_tracker:GetModifierCastRangeBonusStacking()
	if self.ability.talents.has_h4 == 0 then
		return
	end
	return self.ability.talents.h4_range
end

modifier_abaddon_death_coil_custom_leash = class(mod_hidden)
function modifier_abaddon_death_coil_custom_leash:IsPurgable()
	return true
end
function modifier_abaddon_death_coil_custom_leash:GetEffectName()
	return "particles/abaddon/coil_leash.vpcf"
end
function modifier_abaddon_death_coil_custom_leash:CheckState()
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

modifier_abaddon_death_coil_custom_move = class(mod_visible)
function modifier_abaddon_death_coil_custom_move:GetTexture()
	return "buffs/abaddon/mist_4"
end
function modifier_abaddon_death_coil_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/zeus/zuus_speed.vpcf", self)
end

function modifier_abaddon_death_coil_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_abaddon_death_coil_custom_move:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.q4_move
end

modifier_abaddon_death_coil_custom_unslow = class(mod_hidden)
function modifier_abaddon_death_coil_custom_unslow:OnCreated()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Abaddon.Mist_cdr")
	self.parent:GenericParticle("particles/abaddon/coil_speed.vpcf", self)
	self.parent:GenericParticle("particles/abaddon/coil_cdr.vpcf")
end

function modifier_abaddon_death_coil_custom_unslow:CheckState()
	return {
		[MODIFIER_STATE_UNSLOWABLE] = true,
	}
end

modifier_abaddon_death_coil_custom_scepter_proc = class(mod_hidden)
function modifier_abaddon_death_coil_custom_scepter_proc:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.damage = self.ability.scepter_damage - 100
end

function modifier_abaddon_death_coil_custom_scepter_proc:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_abaddon_death_coil_custom_scepter_proc:GetModifierDamageOutgoing_Percentage()
	return self.damage
end

modifier_abaddon_death_coil_custom_cd = class(mod_hidden)

modifier_abaddon_death_coil_custom_auto = class(mod_hidden)
function modifier_abaddon_death_coil_custom_auto:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_abaddon_death_coil_custom_auto:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.target = EntIndexToHScript(table.target)
	self:StartIntervalThink(self.ability.talents.q3_delay)
end

function modifier_abaddon_death_coil_custom_auto:OnIntervalThink()
	if not IsServer() then
		return
	end

	if IsValid(self.target) then
		self.ability:OnSpellStart(self.target, "modifier_abaddon_mist_3")
	end

	self:Destroy()
end

modifier_abaddon_death_coil_custom_slow = class(mod_hidden)
function modifier_abaddon_death_coil_custom_slow:IsPurgable()
	return true
end
function modifier_abaddon_death_coil_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.slow = self.ability.talents.q3_slow
end

function modifier_abaddon_death_coil_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_abaddon_death_coil_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

abaddon_death_coil_custom_legendary = class({})
abaddon_death_coil_custom_legendary.talents = {}

function abaddon_death_coil_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q7_talent_cd = caster:GetTalentValue("modifier_abaddon_mist_7", "talent_cd", true),
		}
	end
end

function abaddon_death_coil_custom_legendary:CreateTalent(name)
	self:SetHidden(false)
end

function abaddon_death_coil_custom_legendary:GetCooldown()
	return self.talents.q7_talent_cd or 0
end

function abaddon_death_coil_custom_legendary:OnSpellStart()
	local main_ability = self.caster.mist_ability
	if not IsValid(main_ability) then
		return
	end

	self.caster:EmitSound("Abaddon.Mist_legendary")
	self.caster:EmitSound("Abaddon.Mist_legendary2")

	local particle = ParticleManager:CreateParticle(
		"particles/abaddon/coil_legendary_cast.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControl(particle, 0, self.caster:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(particle)

	local units = {}

	for _, index in pairs(main_ability.thinkers) do
		local unit = EntIndexToHScript(index)
		if IsValid(unit) then
			units[#units + 1] = unit
		end
	end

	if #units == 0 then
		return
	end

	for i = 1, #units do
		local mod = units[i]:FindModifierByName("modifier_abaddon_death_coil_custom_legendary_unit")

		if mod then
			mod.launch = true
			mod:Destroy()
		end
	end
end