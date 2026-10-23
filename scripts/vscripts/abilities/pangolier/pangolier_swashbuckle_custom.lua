--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_dash",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_attacks",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_tracker",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_blood",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_buckle_3"
)
LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_legendary_stack",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_buckle_7"
)
LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_move",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_buckle_4"
)
LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_scepter",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_slow",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_pangolier_swashbuckle_custom_attack_slow",
	"abilities/pangolier/pangolier_swashbuckle_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_pangolier_buckle_2"
)

pangolier_swashbuckle_custom = class({})
pangolier_swashbuckle_custom.talents = {}

function pangolier_swashbuckle_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/juggernaut/jugg_legendary_proc_.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_swashbuckler_dash.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_pangolier/pangolier_swashbuckler.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_sniper/sniper_headshot_slow.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_snapfire_slow.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugg_parry.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/iron_talon_active.vpcf", context)
	PrecacheResource("particle", "particles/pangolier/swashbuckle_bleed.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_proc.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", context)
	PrecacheResource("particle", "particles/sven/cleave_speed_ready.vpcf", context)
end

function pangolier_swashbuckle_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_q1 = 0,
			q1_damage = 0,
			q1_attack = 0,

			has_q2 = 0,
			q2_cd = 0,
			q2_slow = 0,
			q2_duration = caster:GetTalentValue("modifier_pangolier_buckle_2", "duration", true),

			has_q3 = 0,
			q3_crit = 0,
			q3_damage = 0,
			q3_base = 0,
			q3_interval = caster:GetTalentValue("modifier_pangolier_buckle_3", "interval", true),
			q3_duration = caster:GetTalentValue("modifier_pangolier_buckle_3", "duration", true),
			q3_damage_type = caster:GetTalentValue("modifier_pangolier_buckle_3", "damage_type", true),

			has_q4 = 0,
			q4_slow_resist = caster:GetTalentValue("modifier_pangolier_buckle_4", "slow_resist", true),
			q4_duration = caster:GetTalentValue("modifier_pangolier_buckle_4", "duration", true),
			q4_cast = caster:GetTalentValue("modifier_pangolier_buckle_4", "cast", true),
			q4_move = caster:GetTalentValue("modifier_pangolier_buckle_4", "move", true),
			q4_range = caster:GetTalentValue("modifier_pangolier_buckle_4", "range", true),

			has_q7 = 0,
			q7_cd = caster:GetTalentValue("modifier_pangolier_buckle_7", "cd", true) / 100,
			q7_stun = caster:GetTalentValue("modifier_pangolier_buckle_7", "stun", true),
			q7_attack = caster:GetTalentValue("modifier_pangolier_buckle_7", "attack", true),
			q7_duration = caster:GetTalentValue("modifier_pangolier_buckle_7", "duration", true),
			q7_max = caster:GetTalentValue("modifier_pangolier_buckle_7", "max", true) - 1,
			q7_damage = caster:GetTalentValue("modifier_pangolier_buckle_7", "damage", true) / 100,
			q7_distance = caster:GetTalentValue("modifier_pangolier_buckle_7", "distance", true),
			q7_mana = caster:GetTalentValue("modifier_pangolier_buckle_7", "mana", true) / 100,

			has_e2 = 0,
			e2_range = 0,

			has_e4 = 0,
			e4_cd_legendary = caster:GetTalentValue("modifier_pangolier_lucky_4", "cd_legendary", true) / 100,
		}
	end

	if caster:HasTalent("modifier_pangolier_buckle_1") then
		self.talents.has_q1 = 1
		self.talents.q1_damage = caster:GetTalentValue("modifier_pangolier_buckle_1", "damage") / 100
		self.talents.q1_attack = caster:GetTalentValue("modifier_pangolier_buckle_1", "attack")
	end

	if caster:HasTalent("modifier_pangolier_buckle_2") then
		self.talents.has_q2 = 1
		self.talents.q2_cd = caster:GetTalentValue("modifier_pangolier_buckle_2", "cd")
		self.talents.q2_slow = caster:GetTalentValue("modifier_pangolier_buckle_2", "slow")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_pangolier_buckle_3") then
		self.talents.has_q3 = 1
		self.talents.q3_crit = caster:GetTalentValue("modifier_pangolier_buckle_3", "crit")
		self.talents.q3_damage = caster:GetTalentValue("modifier_pangolier_buckle_3", "damage") / 100
		self.talents.q3_base = caster:GetTalentValue("modifier_pangolier_buckle_3", "base")
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_pangolier_buckle_4") then
		self.talents.has_q4 = 1
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_pangolier_buckle_7") then
		self.talents.has_q7 = 1
		if IsServer() and not self.q7_init then
			self.q7_init = true
			self.tracker:UpdateUI()
			self.tracker:InitLegendary()
		end
	end

	if caster:HasTalent("modifier_pangolier_lucky_2") then
		self.talents.has_e2 = 1
		self.talents.e2_range = caster:GetTalentValue("modifier_pangolier_lucky_2", "range")
	end

	if caster:HasTalent("modifier_pangolier_lucky_4") then
		self.talents.has_e4 = 1
	end
end

function pangolier_swashbuckle_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "pangolier_swashbuckle", self)
end

function pangolier_swashbuckle_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_pangolier_swashbuckle_custom_tracker"
end

function pangolier_swashbuckle_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q2_cd or 0)
end

function pangolier_swashbuckle_custom:GetCastRange(vLocation, hTarget)
	local bonus = 0
	if self.caster:HasModifier("modifier_slark_saltwater_shiv_custom_legendary_steal") then
		bonus = bonus + 300
	end
	return self.BaseClass.GetCastRange(self, vLocation, hTarget) + bonus
end

function pangolier_swashbuckle_custom:GetRange()
	return self.range + (self.talents.e2_range or 0)
end

function pangolier_swashbuckle_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) * (1 + (self.talents.has_q7 == 1 and self.talents.q7_mana or 0))
end

function pangolier_swashbuckle_custom:GetCastPoint(iLevel)
	if
		self.caster:HasModifier("modifier_pangolier_gyroshell_custom")
		or self.caster:HasModifier("modifier_pangolier_rollup_custom")
	then
		return 0
	end
	if self.talents.has_q4 == 1 then
		return self.talents.q4_cast
	end
	return self.BaseClass.GetCastPoint(self)
end

function pangolier_swashbuckle_custom:GetDamage()
	return self.damage + self.talents.q1_damage * self.caster:GetAverageTrueAttackDamage(nil)
end

function pangolier_swashbuckle_custom:OnVectorCastStart(vStartLocation, vDirection)
	self.caster:RemoveModifierByName("modifier_pangolier_rollup_custom")
	self.caster:RemoveModifierByName("modifier_pangolier_gyroshell_custom")

	self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_1)

	local point = self.parent:CastPosition(vStartLocation)
	local vector_point = point + vDirection * self:GetRange()

	local speed = self.dash_speed
	local direction = vDirection
	local vector = (point - self.caster:GetOrigin())
	local dist = vector:Length2D()
	vector.z = 0
	vector = vector:Normalized()

	self.caster:FacePoint(self.caster:GetAbsOrigin() + direction)

	local duration = dist / speed + 0.3
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_pangolier_swashbuckle_custom_attacks",
		{ duration = duration + 1, dir_x = direction.x, dir_y = direction.y }
	)
	self.caster:AddNewModifier(self.caster, self, "modifier_pangolier_swashbuckle_custom_dash", {
		x = point.x,
		y = point.y,
		dist = dist,
		duration = duration,
	})

	if
		self.talents.has_e4 == 1
		and IsValid(self.caster.lucky_ability)
		and self.caster.lucky_ability:GetCooldownTimeRemaining() > 0
	then
		if self.talents.has_q7 == 1 then
			self.caster:CdAbility(
				self.caster.lucky_ability,
				nil,
				self.talents.e4_cd_legendary,
				"modifier_pangolier_lucky_4"
			)
		else
			self.caster:LogProc("modifier_pangolier_lucky_4", self.caster.lucky_ability:GetCooldownTimeRemaining())
			self.caster.lucky_ability:EndCooldown()
		end
	end
end

function pangolier_swashbuckle_custom:DealDamage(target)
	if not IsServer() then
		return
	end
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_pangolier_swashbuckle_custom_slow",
		{ duration = self.slow_duration }
	)

	if IsValid(self.caster.lucky_ability) then
		self.caster.lucky_ability:ProcPassive(target)
	end

	self.caster.pangolier_q = true
	self.caster:PerformAttack(
		target,
		true,
		true,
		true,
		false,
		false,
		false,
		true,
		{ damage = "pangolier_q", attack = "pangolier_q" }
	)
	self.caster.pangolier_q = false
	target:EmitSound("Hero_Pangolier.Swashbuckle.Damage")
end

modifier_pangolier_swashbuckle_custom_dash = class(mod_hidden)
function modifier_pangolier_swashbuckle_custom_dash:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Hero_Pangolier.Swashbuckle.Cast")
	self.parent:EmitSound("Hero_Pangolier.Swashbuckle.Layer")

	if self.ability.talents.has_q4 == 1 then
		ProjectileManager:ProjectileDodge(self.parent)
	end

	self.point = GetGroundPosition(Vector(kv.x, kv.y, 0), nil)
	self.angle = (self.point - self.parent:GetAbsOrigin()):Normalized()
	self.angle.z = 0
	self.speed = self.ability.dash_speed
	self.max_dist = kv.dist
	self.dist = 0

	self.targets = {}

	if self:ApplyHorizontalMotionController() == false then
		self:Destroy()
	end
end

function modifier_pangolier_swashbuckle_custom_dash:UpdateHorizontalMotion(me, dt)
	if not IsServer() then
		return
	end
	local dist = self.speed * dt
	local next_pos = GetGroundPosition(self.parent:GetAbsOrigin() + dist * self.angle, me)
	me:SetAbsOrigin(next_pos)

	self.dist = self.dist + dist
	if self.dist >= self.max_dist then
		self.success = true
		self:Destroy()
	end
end

function modifier_pangolier_swashbuckle_custom_dash:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_pangolier_swashbuckle_custom_dash:CheckState()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

function modifier_pangolier_swashbuckle_custom_dash:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_pangolier_swashbuckle_custom_dash:GetOverrideAnimation()
	return ACT_DOTA_CAST_ABILITY_1
end

function modifier_pangolier_swashbuckle_custom_dash:GetModifierDisableTurning()
	return 1
end

function modifier_pangolier_swashbuckle_custom_dash:OnDestroy()
	if not IsServer() then
		return
	end

	self.parent:InterruptMotionControllers(true)

	self.parent:FacePoint()
	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), false)

	self.parent:FadeGesture(ACT_DOTA_CAST_ABILITY_1)

	local mod = self.parent:FindModifierByName("modifier_pangolier_swashbuckle_custom_attacks")
	if not mod then
		return
	end

	if not self.success then
		mod:Destroy()
	else
		mod:Activate()
	end
end

modifier_pangolier_swashbuckle_custom_attacks = class(mod_hidden)
function modifier_pangolier_swashbuckle_custom_attacks:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.radius = self.ability.start_radius

	self.interval = self.ability.attack_interval
	self.strikes = self.ability.strikes

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_pangolier/pangolier_swashbuckler_dash.vpcf", self)

	self.direction = Vector(kv.dir_x, kv.dir_y, 0) * self.ability:GetRange()

	self.damage = self.ability:GetDamage()
	self.is_legendary = false

	local mod = self.parent:FindModifierByName("modifier_pangolier_swashbuckle_custom_legendary_stack")

	if self.ability.talents.has_q7 == 1 then
		self.parent:LogProc("modifier_pangolier_buckle_7_cast", mod and mod:GetStackCount() or 0)
	end

	if mod then
		self.strikes = self.strikes + mod:GetStackCount()
		if mod:GetStackCount() >= self.ability.talents.q7_max then
			self.damage = self.damage * (1 + self.ability.talents.q7_damage)
			self.no_charge = true
			self.is_legendary = true
			mod:Destroy()
		end
	end

	self.active = false
	self.count = 0
end

function modifier_pangolier_swashbuckle_custom_attacks:Activate()
	if not IsServer() then
		return
	end
	if self.active then
		return
	end

	self.active = true
	self:SetDuration(999, false)
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_1_END)
	local weapon_model = self.parent:GetItemWearableHandle("offhand_weapon")
	if weapon_model then
		weapon_model:StartGesture(ACT_DOTA_CAST_ABILITY_1_END)
	end

	self.origin = self.parent:GetOrigin()
	self.target = self.origin + self.direction

	self:StartIntervalThink(self.interval)
	self:OnIntervalThink()
end

function modifier_pangolier_swashbuckle_custom_attacks:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.parent:IsHexed() then
		self:Destroy()
		return
	end

	self.count = self.count + 1

	if self.count > self.strikes then
		self:Destroy()
		return
	end

	local sound_swashbuckle = wearables_system:GetSoundReplacement(self.parent, "Hero_Pangolier.Swashbuckle", self)
	self.parent:EmitSound(sound_swashbuckle)

	local enemies = FindUnitsInLine(
		self.parent:GetTeamNumber(),
		self.origin,
		self.target,
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		0
	)
	for _, target in pairs(enemies) do
		self.ability:DealDamage(target)
		if target:IsRealHero() then
			self.hit_hero = true
		end

		if self.is_legendary then
			target:EmitSound("Pango.Swash_legendary_target")
			local trail_pfx =
				ParticleManager:CreateParticle("particles/items3_fx/iron_talon_active.vpcf", PATTACH_ABSORIGIN, target)
			ParticleManager:SetParticleControlEnt(
				trail_pfx,
				0,
				target,
				PATTACH_ABSORIGIN_FOLLOW,
				nil,
				target:GetAbsOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				trail_pfx,
				1,
				target,
				PATTACH_ABSORIGIN_FOLLOW,
				nil,
				target:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(trail_pfx)

			if self.count == 1 then
				target:GenericParticle("particles/juggernaut/jugg_legendary_proc_.vpcf")
				target:EmitSound("Pango.Swash_legendary_stun")
				target:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_stunned",
					{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.q7_stun }
				)
				self.parent:LogProc("modifier_pangolier_buckle_7", nil, target)
			end
		end
	end

	local swashbuckle_particle = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_pangolier/pangolier_swashbuckler.vpcf",
		self
	)
	local effect_cast = ParticleManager:CreateParticle(swashbuckle_particle, PATTACH_POINT_FOLLOW, self.parent)
	ParticleManager:SetParticleControlEnt(
		effect_cast,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControl(effect_cast, 1, self.direction)
	ParticleManager:SetParticleControl(effect_cast, 3, self.direction)

	local destroy_time = 0.2
	if swashbuckle_particle ~= "particles/units/heroes/hero_pangolier/pangolier_swashbuckler.vpcf" then
		destroy_time = self.radius / (2.3 * self.radius)
	else
		self:AddParticle(effect_cast, false, false, -1, false, false)
	end
	Timers:CreateTimer(destroy_time, function()
		if effect_cast then
			ParticleManager:DestroyParticle(effect_cast, false)
			ParticleManager:ReleaseParticleIndex(effect_cast)
		end
	end)

	self.parent:EmitSound("Hero_Pangolier.Swashbuckle.Attack")
end

function modifier_pangolier_swashbuckle_custom_attacks:OnDestroy()
	if not IsServer() then
		return
	end

	if self.hit_hero and not self.no_charge and self.ability.talents.has_q7 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_pangolier_swashbuckle_custom_legendary_stack",
			{ duration = self.ability.talents.q7_duration }
		)
	end
end

function modifier_pangolier_swashbuckle_custom_attacks:CheckState()
	return {
		[MODIFIER_STATE_STUNNED] = true,
	}
end

function modifier_pangolier_swashbuckle_custom_attacks:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
	}
end

function modifier_pangolier_swashbuckle_custom_attacks:GetCritDamage()
	if self.ability.talents.has_q3 == 0 then
		return
	end
	if self.count < self.strikes then
		return
	end
	return self.ability.talents.q3_crit
end

function modifier_pangolier_swashbuckle_custom_attacks:GetModifierPreAttack_CriticalStrike(params)
	if self.ability.talents.has_q3 == 0 then
		return
	end
	if not self.active then
		return
	end
	if self.count < self.strikes then
		return
	end
	params.target:EmitSound("DOTA_Item.Daedelus.Crit")
	self.parent:LogProc("modifier_pangolier_buckle_3", nil, params.target)
	return self.ability.talents.q3_crit
end

function modifier_pangolier_swashbuckle_custom_attacks:GetModifierOverrideAttackDamage()
	if not self.active then
		return
	end
	return self.damage
end

modifier_pangolier_swashbuckle_custom_tracker = class(mod_hidden)
function modifier_pangolier_swashbuckle_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.swash_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.range = self.ability:GetSpecialValueFor("range")
	self.ability.dash_speed = self.ability:GetSpecialValueFor("dash_speed")
	self.ability.attack_interval = self.ability:GetSpecialValueFor("attack_interval")
	self.ability.start_radius = self.ability:GetSpecialValueFor("start_radius")
	self.ability.end_radius = self.ability:GetSpecialValueFor("end_radius")
	self.ability.strikes = self.ability:GetSpecialValueFor("strikes")
	self.ability.slow = self.ability:GetSpecialValueFor("slow")
	self.ability.slow_duration = self.ability:GetSpecialValueFor("slow_duration")
end

function modifier_pangolier_swashbuckle_custom_tracker:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_pangolier_swashbuckle_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end

	local stack = 0
	local mod = self.parent:FindModifierByName("modifier_pangolier_swashbuckle_custom_legendary_stack")

	if mod then
		stack = mod:GetStackCount()
	end

	self.parent:UpdateUIlong({ stack = stack, max = self.ability.talents.q7_max, style = "PangolierSwash" })
end

function modifier_pangolier_swashbuckle_custom_tracker:GetProcChance()
	return 100
end

function modifier_pangolier_swashbuckle_custom_tracker:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_q2 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_pangolier_swashbuckle_custom_attack_slow",
			{ duration = self.ability.talents.q2_duration }
		)
	end

	if self.ability.talents.has_q4 == 1 then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_pangolier_swashbuckle_custom_move",
			{ duration = self.ability.talents.q4_duration }
		)
	end

	if
		self.ability.talents.has_q3 == 1 and (self.ability.talents.has_q7 == 0 or params.attack_flag == "pangolier_q")
	then
		local damage = self.ability.talents.q3_base + params.damage * self.ability.talents.q3_damage
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_pangolier_swashbuckle_custom_blood",
			{ damage = damage }
		)
	end
end

function modifier_pangolier_swashbuckle_custom_tracker:InitLegendary()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if self.legendary_init then
		return
	end

	self.legendary_init = true
	self.pos = self.parent:GetAbsOrigin()
	self.distance = 0
	self:StartIntervalThink(0.2)
end

function modifier_pangolier_swashbuckle_custom_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end

	local pass = (self.parent:GetAbsOrigin() - self.pos):Length2D()
	self.pos = self.parent:GetAbsOrigin()

	if
		self.ability:GetCooldownTimeRemaining() <= 0
		or self.parent:HasModifier("modifier_pangolier_swashbuckle_custom_attacks")
	then
		self.distance = 0
		return
	end

	local final = self.distance + pass
	local max_distance = self.ability.talents.q7_distance

	if final >= max_distance then
		local delta = math.floor(final / max_distance)
		self.parent:CdAbility(self.ability, nil, self.ability.talents.q7_cd * delta, "modifier_pangolier_buckle_7")
		self.distance = final - delta * max_distance
	else
		self.distance = final
	end
end

function modifier_pangolier_swashbuckle_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_pangolier_swashbuckle_custom_tracker:GetModifierDamageOutgoing_Percentage()
	if self.parent.pangolier_q then
		return
	end
	return self.ability.talents.q1_attack
end

function modifier_pangolier_swashbuckle_custom_tracker:GetModifierCastRangeBonusStacking()
	if self.ability.talents.has_q4 == 0 then
		return
	end
	return self.ability.talents.q4_range
end

modifier_pangolier_swashbuckle_custom_legendary_stack = class(mod_hidden)
function modifier_pangolier_swashbuckle_custom_legendary_stack:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q7_max
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_pangolier_swashbuckle_custom_legendary_stack:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.ability.tracker then
		self.ability.tracker:UpdateUI()
	end

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("Pango.Swash_legendary_ready")
		self.parent:GenericParticle("particles/legion_commander/lc_odd_proc_.vpcf")
		self.parent:GenericParticle("particles/sven/cleave_speed_ready.vpcf", self, true)
	end
end

function modifier_pangolier_swashbuckle_custom_legendary_stack:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.ability.tracker then
		return
	end
	self.ability.tracker:UpdateUI()
end

modifier_pangolier_swashbuckle_custom_move = class(mod_visible)
function modifier_pangolier_swashbuckle_custom_move:GetTexture()
	return "buffs/pangolier/buckle_4"
end
function modifier_pangolier_swashbuckle_custom_move:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.move = self.ability.talents.q4_move
	self.slow_resist = self.ability.talents.q4_slow_resist
	if not IsServer() then
		return
	end
	self:OnIntervalThink()
	self:StartIntervalThink(2)
end

function modifier_pangolier_swashbuckle_custom_move:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.effect then
		ParticleManager:DestroyParticle(self.effect, false)
		ParticleManager:ReleaseParticleIndex(self.effect)
		self.effect = nil
	end

	self.effect =
		self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_allymovespeed.vpcf", self)
end

function modifier_pangolier_swashbuckle_custom_move:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_SLOW_RESISTANCE_STACKING,
	}
end

function modifier_pangolier_swashbuckle_custom_move:GetModifierMoveSpeedBonus_Percentage()
	return self.move
end

function modifier_pangolier_swashbuckle_custom_move:GetModifierSlowResistance_Stacking()
	return self.slow_resist
end

modifier_pangolier_swashbuckle_custom_scepter = class(mod_hidden)
function modifier_pangolier_swashbuckle_custom_scepter:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.range = self.ability:GetRange()
	self.radius = self.ability.start_radius

	self.interval = self.ability.attack_interval
	self.damage = self.ability:GetDamage()
	self.strikes = table.strikes

	self.origin = self.parent:GetAbsOrigin()
	self.count = 0

	self:StartIntervalThink(self.interval)
	self:OnIntervalThink()
end

function modifier_pangolier_swashbuckle_custom_scepter:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ATTACK_DAMAGE,
	}
end

function modifier_pangolier_swashbuckle_custom_scepter:GetModifierOverrideAttackDamage()
	return self.damage
end

function modifier_pangolier_swashbuckle_custom_scepter:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.parent:IsHexed() then
		self:Destroy()
		return
	end

	self.count = self.count + 1
	local sound_swashbuckle = wearables_system:GetSoundReplacement(self.parent, "Hero_Pangolier.Swashbuckle", self)
	self.parent:EmitSound(sound_swashbuckle)

	local targets = {}
	local dir = self.parent:GetForwardVector()
	dir.z = 0
	local target = self.origin + dir * self.range

	for i = 1, 4 do
		local target = RotatePosition(self.origin, QAngle(0, 90 * (i - 1), 0), target)
		local dir = (target - self.origin):Normalized()

		local enemies = FindUnitsInLine(
			self.parent:GetTeamNumber(),
			self.origin,
			target,
			nil,
			self.radius,
			DOTA_UNIT_TARGET_TEAM_ENEMY,
			DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
			0
		)

		for _, enemy in pairs(enemies) do
			if not targets[enemy] then
				targets[enemy] = true
				self.ability:DealDamage(enemy)
			end
		end

		local swashbuckle_particle = wearables_system:GetParticleReplacementAbility(
			self.parent,
			"particles/units/heroes/hero_pangolier/pangolier_swashbuckler.vpcf",
			self
		)
		local effect_cast = ParticleManager:CreateParticle(swashbuckle_particle, PATTACH_POINT, self.parent)
		ParticleManager:SetParticleControlEnt(
			effect_cast,
			0,
			self.parent,
			PATTACH_ABSORIGIN,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:SetParticleControl(effect_cast, 1, dir * self.range)
		ParticleManager:SetParticleControl(effect_cast, 3, dir * self.range)
		local destroy_time = 0.2
		if swashbuckle_particle ~= "particles/units/heroes/hero_pangolier/pangolier_swashbuckler.vpcf" then
			destroy_time = self.range / (2.3 * self.range)
		else
			self:AddParticle(effect_cast, false, false, -1, false, false)
		end
		Timers:CreateTimer(destroy_time, function()
			if effect_cast then
				ParticleManager:DestroyParticle(effect_cast, false)
				ParticleManager:ReleaseParticleIndex(effect_cast)
			end
		end)

		self.parent:EmitSound("Hero_Pangolier.Swashbuckle.Attack")
	end

	if self.count >= self.strikes then
		self:Destroy()
		return
	end
end

modifier_pangolier_swashbuckle_custom_slow = class(mod_hidden)
function modifier_pangolier_swashbuckle_custom_slow:IsPurgable()
	return true
end
function modifier_pangolier_swashbuckle_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.slow = self.ability.slow
end

function modifier_pangolier_swashbuckle_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_pangolier_swashbuckle_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_pangolier_swashbuckle_custom_attack_slow = class(mod_hidden)
function modifier_pangolier_swashbuckle_custom_attack_slow:IsPurgable()
	return true
end
function modifier_pangolier_swashbuckle_custom_attack_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.slow = self.ability.talents.q2_slow
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_thunder_clap_debuff.vpcf", self)
end

function modifier_pangolier_swashbuckle_custom_attack_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_pangolier_swashbuckle_custom_attack_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_pangolier_swashbuckle_custom_blood = class(mod_visible)
function modifier_pangolier_swashbuckle_custom_blood:GetTexture()
	return "buffs/pangolier/buckle_3"
end
function modifier_pangolier_swashbuckle_custom_blood:OnCreated(table)
	if not IsServer() then
		return
	end
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.duration = self.ability.talents.q3_duration
	self.interval = self.ability.talents.q3_interval
	self.count = 0
	self.tick = 0
	self.total_damage = 0

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.q3_damage_type,
		damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
	}

	self.effect = ParticleManager:CreateParticle(
		"particles/pangolier/swashbuckle_bleed.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.effect,
		0,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetOrigin(),
		true
	)
	self:AddParticle(self.effect, false, false, -1, false, false)

	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)

	self.RemoveForDuel = true
	self:OnRefresh(table)
	self:StartIntervalThink(self.interval)
end

function modifier_pangolier_swashbuckle_custom_blood:OnRefresh(table)
	if not IsServer() then
		return
	end
	self.total_damage = self.total_damage + table.damage
	self.tick = self.total_damage / self.duration
	self.count = self.duration
	self.damageTable.damage = self.tick
	ParticleManager:SetParticleControl(self.effect, 2, Vector(self.tick, 0, 0))
end

function modifier_pangolier_swashbuckle_custom_blood:OnIntervalThink()
	if not IsServer() then
		return
	end
	local real_damage = DoDamage(self.damageTable, "modifier_pangolier_buckle_3")
	self.parent:SendNumber(110, real_damage)

	self.total_damage = self.total_damage - self.tick
	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end