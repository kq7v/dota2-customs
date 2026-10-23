--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_hoodwink_sharpshooter_custom",
	"abilities/hoodwink/hoodwink_sharpshooter_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_sharpshooter_custom_debuff",
	"abilities/hoodwink/hoodwink_sharpshooter_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_sharpshooter_custom_hits",
	"abilities/hoodwink/hoodwink_sharpshooter_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_sharp_1"
)
LinkLuaModifier(
	"modifier_hoodwink_sharpshooter_custom_sound",
	"abilities/hoodwink/hoodwink_sharpshooter_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_sharpshooter_custom_legendary",
	"abilities/hoodwink/hoodwink_sharpshooter_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_sharp_7"
)
LinkLuaModifier(
	"modifier_hoodwink_sharpshooter_custom_tracker",
	"abilities/hoodwink/hoodwink_sharpshooter_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_hoodwink_sharpshooter_custom_invun",
	"abilities/hoodwink/hoodwink_sharpshooter_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_hoodwink_hero_6"
)

hoodwink_sharpshooter_custom = class({})
hoodwink_sharpshooter_custom.talents = {}

function hoodwink_sharpshooter_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_impact.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_projectile.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/refresher.vpcf", context)
	PrecacheResource("particle", "particles/items_fx/force_staff.vpcf", context)
	PrecacheResource("particle", "particles/generic/patrol_refresh.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_timer.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_debuff.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/sange_maim.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_slow.vpcf", context)
	PrecacheResource("particle", "particles/hoodwink/legendary_count.vpcf", context)
end

function hoodwink_sharpshooter_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_damage = 0,
			r1_heal = 0,
			r1_max = caster:GetTalentValue("modifier_hoodwink_sharp_1", "max", true),

			r2_cd = 0,
			r2_speed = 0,

			has_r3 = 0,
			r3_cast = 0,
			r3_damage = 0,
			r3_delay = caster:GetTalentValue("modifier_hoodwink_sharp_3", "delay", true) / 100,

			has_r4 = 0,
			r4_cdr = caster:GetTalentValue("modifier_hoodwink_sharp_4", "cdr", true),
			r4_cd_items = caster:GetTalentValue("modifier_hoodwink_sharp_4", "cd_items", true),
			r4_cd_items_legendary = caster:GetTalentValue("modifier_hoodwink_sharp_4", "cd_items_legendary", true),
			r4_knock_max = caster:GetTalentValue("modifier_hoodwink_sharp_4", "knock_max", true),
			r4_duration = caster:GetTalentValue("modifier_hoodwink_sharp_4", "duration", true),
			r4_knock_range = caster:GetTalentValue("modifier_hoodwink_sharp_4", "knock_range", true),

			has_h6 = 0,
			h6_invun = caster:GetTalentValue("modifier_hoodwink_hero_6", "invun", true),
			h6_invun_legendary = caster:GetTalentValue("modifier_hoodwink_hero_6", "invun_legendary", true),
			h6_bkb = caster:GetTalentValue("modifier_hoodwink_hero_6", "bkb", true),
			h6_bkb_legendary = caster:GetTalentValue("modifier_hoodwink_hero_6", "bkb_legendary", true),

			has_r7 = 0,
			r7_cd = caster:GetTalentValue("modifier_hoodwink_sharp_7", "cd", true) / 100,
			r7_mana = caster:GetTalentValue("modifier_hoodwink_sharp_7", "mana", true) / 100,
			r7_delay = caster:GetTalentValue("modifier_hoodwink_sharp_7", "delay", true),
			r7_damage = caster:GetTalentValue("modifier_hoodwink_sharp_7", "damage", true) / 100,
			r7_damage_inc = caster:GetTalentValue("modifier_hoodwink_sharp_7", "damage_inc", true) / 100,
			r7_max = caster:GetTalentValue("modifier_hoodwink_sharp_7", "max", true),
			r7_duration = caster:GetTalentValue("modifier_hoodwink_sharp_7", "duration", true),

			has_w3 = 0,
			w3_sharp = caster:GetTalentValue("modifier_hoodwink_bush_3", "sharp", true),
		}
	end

	if caster:HasTalent("modifier_hoodwink_sharp_1") then
		self.talents.has_r1 = 1
		self.talents.r1_damage = caster:GetTalentValue("modifier_hoodwink_sharp_1", "damage")
		self.talents.r1_heal = caster:GetTalentValue("modifier_hoodwink_sharp_1", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_hoodwink_sharp_1", type = 1, value = self.talents.r1_heal }
		)
	end

	if caster:HasTalent("modifier_hoodwink_sharp_2") then
		self.talents.r2_cd = caster:GetTalentValue("modifier_hoodwink_sharp_2", "cd")
		self.talents.r2_speed = caster:GetTalentValue("modifier_hoodwink_sharp_2", "speed") / 100
	end

	if caster:HasTalent("modifier_hoodwink_sharp_3") then
		self.talents.has_r3 = 1
		self.talents.r3_cast = caster:GetTalentValue("modifier_hoodwink_sharp_3", "cast") / 100
		self.talents.r3_damage = caster:GetTalentValue("modifier_hoodwink_sharp_3", "damage") / 100
	end

	if caster:HasTalent("modifier_hoodwink_sharp_4") then
		self.talents.has_r4 = 1
	end

	if caster:HasTalent("modifier_hoodwink_hero_6") then
		self.talents.has_h6 = 1
	end

	if caster:HasTalent("modifier_hoodwink_sharp_7") then
		self.talents.has_r7 = 1
	end

	if caster:HasTalent("modifier_hoodwink_bush_3") then
		self.talents.has_w3 = 1
	end
end

function hoodwink_sharpshooter_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "hoodwink_sharpshooter", self)
end

function hoodwink_sharpshooter_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_hoodwink_sharpshooter_custom_tracker"
end

function hoodwink_sharpshooter_custom:GetCooldown(level)
	local bonus_k = self.talents.has_r7 == 1 and (1 + self.talents.r7_cd) or 1
	return (self.BaseClass.GetCooldown(self, level) + (self.talents.r2_cd or 0)) * bonus_k
end

function hoodwink_sharpshooter_custom:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level) * (self.talents.has_r7 == 1 and (1 + self.talents.r7_mana) or 1)
end

function hoodwink_sharpshooter_custom:OnSpellStart()
	local point = self:GetCursorPosition()
	local duration = self.misfire_time

	if self.talents.has_h6 == 1 then
		local invun = self.talents.has_r7 == 1 and self.talents.h6_invun_legendary or self.talents.h6_invun
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_hoodwink_sharpshooter_custom_invun",
			{ duration = invun }
		)
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_hoodwink_sharpshooter_custom",
		{ duration = duration, x = point.x, y = point.y }
	)
end

function hoodwink_sharpshooter_custom:OnProjectileThink_ExtraData(location, ExtraData)
	local sound = EntIndexToHScript(ExtraData.sound)
	if not sound or sound:IsNull() then
		return
	end
	sound:SetOrigin(location)
end

function hoodwink_sharpshooter_custom:OnProjectileHit_ExtraData(target, location, ExtraData)
	local sound = EntIndexToHScript(ExtraData.sound)
	if IsValid(sound) then
		sound:StopSound("Hero_Hoodwink.Sharpshooter.Projectile")
		UTIL_Remove(sound)
	end

	if not target then
		return false
	end
	local mod = target:FindModifierByName("modifier_hoodwink_sharpshooter_custom_legendary")
	local damage = ExtraData.damage
	local duration = ExtraData.duration
	local damage_ability = nil
	local pct = ExtraData.pct

	local origin = Vector(ExtraData.x, ExtraData.y, 0)
	local vec = (target:GetAbsOrigin() - origin)
	vec.z = 0
	local dir = vec:Normalized()

	if ExtraData.auto == 1 then
		damage_ability = "modifier_hoodwink_sharp_3"
	end

	if mod then
		damage = damage * (1 + mod:GetStackCount() * self.talents.r7_damage_inc)
	end

	target:RemoveModifierByName("modifier_hoodwink_sharpshooter_custom_debuff")
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_hoodwink_sharpshooter_custom_debuff",
		{ duration = duration * (1 - target:GetStatusResistance()) }
	)

	if
		self.talents.has_r4 == 1
		and not damage_ability
		and not target:IsDebuffImmune()
		and vec:Length2D() <= self.talents.r4_knock_range
	then
		target:AddNewModifier(self.caster, self, "modifier_generic_knockback", {
			direction_x = dir.x,
			direction_y = dir.y,
			distance = self.talents.r4_knock_max * pct,
			height = 0,
			duration = self.talents.r4_duration,
			IsStun = false,
			IsFlail = true,
			Purgable = 1,
		})
	end

	local damageTable =
		{ victim = target, attacker = self.caster, damage = damage, damage_type = DAMAGE_TYPE_MAGICAL, ability = self }
	local real = DoDamage(damageTable, damage_ability)

	if pct >= 1 and target:IsRealHero() and self.caster:GetQuest() == "Hoodwink.Quest_8" then
		self.caster:UpdateQuest(1)
	end

	if pct >= 1 then
		if target:IsValidKill(self.caster) then
			self.caster:AddNewModifier(self.caster, self, "modifier_hoodwink_sharpshooter_custom_hits", {})
		end
		if self.talents.has_r7 == 1 then
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_hoodwink_sharpshooter_custom_legendary",
				{ duration = self.talents.r7_duration }
			)
		end
	end

	if self.talents.has_w3 == 1 and IsValid(self.caster.bush_ability) then
		self.caster.bush_ability:AddPoison(target, math.floor(pct * self.talents.w3_sharp))
	end

	target:SendNumber(6, real)
	AddFOWViewer(self.caster:GetTeamNumber(), target:GetOrigin(), 300, 4, false)

	local pfx_impact = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_impact.vpcf",
		self
	)

	local effect_cast = ParticleManager:CreateParticle(pfx_impact, PATTACH_ABSORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControl(effect_cast, 0, target:GetOrigin())
	ParticleManager:SetParticleControl(effect_cast, 1, target:GetOrigin())
	ParticleManager:SetParticleControlForward(effect_cast, 1, dir)
	ParticleManager:ReleaseParticleIndex(effect_cast)
	target:EmitSound("Hero_Hoodwink.Sharpshooter.Target")
end

modifier_hoodwink_sharpshooter_custom = class(mod_visible)
function modifier_hoodwink_sharpshooter_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.team = self.parent:GetTeamNumber()

	self.interval = 0.03
	self.charge = self.ability.max_charge_time
	self.base = self.ability.base_power
	self.damage = self.ability.max_damage
	self.duration = self.ability.max_slow_debuff_duration
	self.turn_rate = self.ability.turn_rate * (1 + self.ability.talents.r2_speed)
	self.recoil_distance = self.ability.recoil_distance
	self.recoil_duration = self.ability.recoil_duration
	self.recoil_height = self.ability.recoil_height
	self.projectile_speed = self.ability.arrow_speed * (1 + self.ability.talents.r2_speed)
	self.projectile_range = self.ability.arrow_range
	self.projectile_width = self.ability.arrow_width
	self.turn_speed = self.interval * self.turn_rate

	if self.ability.talents.has_r7 == 1 then
		self.charge = self.charge + self.ability.talents.r7_delay
	end
	self.charge = self.charge * (1 + self.ability.talents.r3_cast)

	self:StartIntervalThink(self.interval)
	if not IsServer() then
		return
	end

	local mod = self.parent:FindModifierByName("modifier_hoodwink_sharpshooter_custom_hits")
	if mod and self.ability.talents.has_r1 == 1 then
		self.damage = self.damage + mod:GetStackCount() * (self.ability.talents.r1_damage / self.ability.talents.r1_max)
	end

	if self.ability.talents.has_r7 == 1 then
		self.damage = self.damage * (1 + self.ability.talents.r7_damage)
	end

	self.parent:AddOrderEvent(self)
	self.RemoveForDuel = true

	local vec = Vector(kv.x, kv.y, 0)
	self:SetDirection(vec)
	self.current_dir = self.target_dir
	self.face_target = true
	self.parent:FacePoint(self.parent:GetAbsOrigin() + self.current_dir)
	self.max_charge = false

	local projectile_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_projectile.vpcf",
		self
	)

	self.info = {
		Source = self.parent,
		Ability = self.ability,
		bDeleteOnHit = false,
		iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
		iUnitTargetFlags = DOTA_UNIT_TARGET_FLAG_NONE,
		iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		EffectName = projectile_name,
		fDistance = self.projectile_range,
		fStartRadius = self.projectile_width,
		fEndRadius = self.projectile_width,
		bHasFrontalCone = false,
		bReplaceExisting = false,
		bProvidesVision = true,
		bVisibleToEnemies = true,
		iVisionRadius = self.ability.arrow_vision,
		iVisionTeamNumber = self.parent:GetTeamNumber(),
	}

	self.parent:SwapAbilities("hoodwink_sharpshooter_custom", "hoodwink_sharpshooter_release_custom", false, true)

	local pfx_name = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter.vpcf",
		self
	)

	local effect_cast = ParticleManager:CreateParticle(pfx_name, PATTACH_ABSORIGIN_FOLLOW, self.parent)
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

	EmitSoundOn("Hero_Hoodwink.Sharpshooter.Channel", self.parent)

	local has_blue_style = self.parent:HasUnequipItem(23627) or self.parent:HasUnequipItem(236271)
	local particle_range_finder = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_range_finder.vpcf",
		self,
		"hoodwink_sharpshooter_custom"
	)
	if particle_range_finder ~= "particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_range_finder.vpcf" then
		has_blue_style = true
	end
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_hoodwink_ulti",
		{ state = 1, range = self.projectile_range, has_blue_style = has_blue_style }
	)
end

function modifier_hoodwink_sharpshooter_custom:Shoot(is_auto)
	if not IsServer() then
		return
	end

	local direction = self.current_dir
	local pct = math.min(1, (math.min(self:GetElapsedTime(), self.charge) / self.charge + self.base))
	local auto = 0

	self.info.vSpawnOrigin = self.parent:GetOrigin()
	self.info.vVelocity = direction * self.projectile_speed

	local sound = CreateModifierThinker(
		self.parent,
		self.ability,
		"modifier_hoodwink_sharpshooter_custom_sound",
		{},
		self.parent:GetOrigin(),
		self.team,
		false
	)
	sound:EmitSound("Hero_Hoodwink.Sharpshooter.Projectile")

	if is_auto then
		pct = self.ability.talents.r3_damage
		auto = 1
	end

	local duration = self.duration * pct
	local damage = self.damage * pct
	local origin = self.parent:GetAbsOrigin()

	self.info.ExtraData = {
		damage = damage,
		pct = pct,
		duration = duration,
		x = origin.x,
		y = origin.y,
		auto = auto,
		sound = sound:entindex(),
	}
	ProjectileManager:CreateLinearProjectile(self.info)
end

function modifier_hoodwink_sharpshooter_custom:OnDestroy()
	if not IsServer() then
		return
	end

	StopSoundOn("Hero_Hoodwink.Sharpshooter.Channel", self.parent)
	CustomGameEventManager:Send_ServerToPlayer(
		PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
		"ability_hoodwink_ulti",
		{ state = 2 }
	)

	local direction = self.current_dir
	self:Shoot()

	local bump_point = self.parent:GetAbsOrigin() + direction * self.recoil_distance
	local mod = self.parent:AddNewModifier(self.parent, self.ability, "modifier_knockback", {
		duration = self.recoil_duration,
		knockback_height = self.recoil_height,
		knockback_distance = self.recoil_distance,
		knockback_duration = self.recoil_duration,
		center_x = bump_point.x,
		center_y = bump_point.y,
		center_z = bump_point.z,
	})

	if mod then
		self.parent:GenericParticle("particles/items_fx/force_staff.vpcf", mod)
	end

	self.parent:RemoveModifierByName("modifier_hoodwink_sharpshooter_custom_invun")

	if self.ability.talents.has_h6 == 1 then
		self.parent:Purge(false, true, false, true, true)
		local duration = self.ability.talents.has_r7 == 1 and self.ability.talents.h6_bkb_legendary
			or self.ability.talents.h6_bkb
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ effect = 2, duration = duration }
		)
	end

	if self.ability.talents.has_r4 == 1 then
		local pct = math.min(1, (math.min(self:GetElapsedTime(), self.charge) / self.charge + self.base))
		local cd_items = pct
			* (
				self.ability.talents.has_r7 == 1 and self.ability.talents.r4_cd_items_legendary
				or self.ability.talents.r4_cd_items
			)
		self.parent:CdItems(cd_items, "modifier_hoodwink_sharp_4")
	end

	self.parent:SwapAbilities("hoodwink_sharpshooter_release_custom", "hoodwink_sharpshooter_custom", false, true)
	self.parent:StopSound("Hero_Hoodwink.Sharpshooter.Cast")
	self.parent:EmitSound("Hero_Hoodwink.Sharpshooter.Cast")
	self.ability:StartCd()
end

function modifier_hoodwink_sharpshooter_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
	}
end

function modifier_hoodwink_sharpshooter_custom:GetOverrideAnimation()
	return ACT_DOTA_CHANNEL_ABILITY_6
end

function modifier_hoodwink_sharpshooter_custom:OrderEvent(params)
	if not IsServer() then
		return
	end
	if
		params.order_type == DOTA_UNIT_ORDER_MOVE_TO_POSITION
		or params.order_type == DOTA_UNIT_ORDER_MOVE_TO_DIRECTION
	then
		self:SetDirection(params.pos)
	elseif
		(params.order_type == DOTA_UNIT_ORDER_MOVE_TO_TARGET or params.order_type == DOTA_UNIT_ORDER_ATTACK_TARGET)
		and params.target
	then
		self:SetDirection(params.target:GetOrigin())
	end
end

function modifier_hoodwink_sharpshooter_custom:GetModifierMoveSpeed_Limit()
	return 0.1
end

function modifier_hoodwink_sharpshooter_custom:GetModifierDisableTurning()
	return 1
end

function modifier_hoodwink_sharpshooter_custom:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_hoodwink_sharpshooter_custom:OnIntervalThink()
	if not IsServer() then
		self:UpdateStack()
		return
	end

	self:TurnLogic()
	local time = self:GetElapsedTime()
	local full_time = self.charge * (1 - self.base)

	local vision_radius = self.projectile_range

	AddFOWViewer(self.parent:GetTeamNumber(), self.parent:GetOrigin(), vision_radius, 0.1, false)

	if
		not self.auto_shot
		and self.ability.talents.has_r3 == 1
		and time >= full_time * self.ability.talents.r3_delay
	then
		self:Shoot(true)
		self.auto_shot = true
	end

	if not self.charged and time >= full_time then
		self.charged = true
		self.parent:EmitSound("Hero_Hoodwink.Sharpshooter.MaxCharge")
	end

	local remaining = self:GetRemainingTime()
	local seconds = math.ceil(remaining)
	local isHalf = (seconds - remaining) > 0.5
	if isHalf then
		seconds = seconds - 1
	end
	if self.half ~= isHalf then
		self.half = isHalf
		local mid = 1
		if isHalf then
			mid = 8
		end
		local len = 2
		if seconds < 1 then
			len = 1
			if not isHalf then
				return
			end
		end
		local effect_cast = ParticleManager:CreateParticleForTeam(
			"particles/units/heroes/hero_hoodwink/hoodwink_sharpshooter_timer.vpcf",
			PATTACH_OVERHEAD_FOLLOW,
			self.parent,
			self.parent:GetTeamNumber()
		)
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(1, seconds, mid))
		ParticleManager:SetParticleControl(effect_cast, 2, Vector(len, 0, 0))
		ParticleManager:ReleaseParticleIndex(effect_cast)
	end
end

function modifier_hoodwink_sharpshooter_custom:SetDirection(vec)
	if not self.parent or self.parent:IsNull() then
		return
	end

	if vec.x == self.parent:GetAbsOrigin().x and vec.y == self.parent:GetAbsOrigin().y then
		vec = self.parent:GetAbsOrigin() + 100 * self.parent:GetForwardVector()
	end

	self.target_dir = ((vec - self.parent:GetOrigin()) * Vector(1, 1, 0)):Normalized()
	self.face_target = false
end

function modifier_hoodwink_sharpshooter_custom:TurnLogic()
	if not self.parent or self.parent:IsNull() then
		return
	end
	if self.face_target then
		return
	end

	local current_angle = VectorToAngles(self.current_dir).y
	local target_angle = VectorToAngles(self.target_dir).y
	local angle_diff = AngleDiff(current_angle, target_angle)
	local sign = -1
	if angle_diff < 0 then
		sign = 1
	end
	if math.abs(angle_diff) < 1.1 * self.turn_speed then
		self.current_dir = self.target_dir
		self.face_target = true
	else
		self.current_dir = RotatePosition(Vector(0, 0, 0), QAngle(0, sign * self.turn_speed, 0), self.current_dir)
	end
	local a = self.parent:IsCurrentlyHorizontalMotionControlled()
	local b = self.parent:IsCurrentlyVerticalMotionControlled()
	if not (a or b) then
		self.parent:SetForwardVector(self.current_dir)
	end
end

function modifier_hoodwink_sharpshooter_custom:UpdateStack()
	local max = 1
	local full_time = self.charge * (1 - self.base)
	local pct = math.min(max, self:GetElapsedTime() / full_time)

	pct = math.floor(pct * 100)
	self:SetStackCount(pct)
end

modifier_hoodwink_sharpshooter_custom_debuff = class(mod_visible)
function modifier_hoodwink_sharpshooter_custom_debuff:IsPurgable()
	return not self.caster:HasShard()
end
function modifier_hoodwink_sharpshooter_custom_debuff:OnCreated(kv)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.slow = -self.ability.slow_move_pct

	if not IsServer() then
		return
	end

	if self.ability.talents.has_r7 == 0 then
		self.parent:GenericParticle("particles/generic_gameplay/generic_break.vpcf", self, true)
	end

	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)
	self.parent:GenericParticle("particles/units/heroes/hero_hoodwink/hoodwink_acorn_shot_slow.vpcf", self)
end

function modifier_hoodwink_sharpshooter_custom_debuff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_hoodwink_sharpshooter_custom_debuff:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

function modifier_hoodwink_sharpshooter_custom_debuff:CheckState()
	return {
		[MODIFIER_STATE_PASSIVES_DISABLED] = true,
	}
end

modifier_hoodwink_sharpshooter_custom_hits = class({})
function modifier_hoodwink_sharpshooter_custom_hits:IsHidden()
	return self.ability.talents.has_r1 == 0 or self:GetStackCount() >= self.max
end
function modifier_hoodwink_sharpshooter_custom_hits:IsPurgable()
	return false
end
function modifier_hoodwink_sharpshooter_custom_hits:RemoveOnDeath()
	return false
end
function modifier_hoodwink_sharpshooter_custom_hits:GetTexture()
	return "buffs/hoodwink/sharp_1"
end
function modifier_hoodwink_sharpshooter_custom_hits:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r1_max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
	self:IncrementStackCount()
end

function modifier_hoodwink_sharpshooter_custom_hits:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()
end

function modifier_hoodwink_sharpshooter_custom_hits:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_r1 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/generic/patrol_refresh.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_hoodwink_sharpshooter_custom_hits:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_hoodwink_sharpshooter_custom_hits:OnTooltip()
	return self:GetStackCount() * (self.ability.talents.r1_damage / self.max)
end

modifier_hoodwink_sharpshooter_custom_sound = class(mod_hidden)

modifier_hoodwink_sharpshooter_custom_legendary = class(mod_visible)
function modifier_hoodwink_sharpshooter_custom_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r7_max

	self.effect_cast = self.parent:GenericParticle("particles/hoodwink/legendary_count.vpcf", self, true)
	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_hoodwink_sharpshooter_custom_legendary:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self.effect_cast then
		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
	end
end

modifier_hoodwink_sharpshooter_custom_tracker = class(mod_hidden)
function modifier_hoodwink_sharpshooter_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.sharp_ability = self.ability

	self.ability.arrow_speed = self.ability:GetSpecialValueFor("arrow_speed")
	self.ability.arrow_width = self.ability:GetSpecialValueFor("arrow_width")
	self.ability.arrow_range = self.ability:GetSpecialValueFor("arrow_range")
	self.ability.arrow_vision = self.ability:GetSpecialValueFor("arrow_vision")
	self.ability.max_charge_time = self.ability:GetSpecialValueFor("max_charge_time")
	self.ability.max_damage = self.ability:GetSpecialValueFor("max_damage")
	self.ability.recoil_distance = self.ability:GetSpecialValueFor("recoil_distance")
	self.ability.recoil_height = self.ability:GetSpecialValueFor("recoil_height")
	self.ability.recoil_duration = self.ability:GetSpecialValueFor("recoil_duration")
	self.ability.max_slow_debuff_duration = self.ability:GetSpecialValueFor("max_slow_debuff_duration")
	self.ability.misfire_time = self.ability:GetSpecialValueFor("misfire_time")
	self.ability.slow_move_pct = self.ability:GetSpecialValueFor("slow_move_pct")
	self.ability.turn_rate = self.ability:GetSpecialValueFor("turn_rate")
	self.ability.base_power = self.ability:GetSpecialValueFor("base_power")
end

function modifier_hoodwink_sharpshooter_custom_tracker:OnRefresh()
	self.ability.max_damage = self.ability:GetSpecialValueFor("max_damage")
	self.ability.slow_move_pct = self.ability:GetSpecialValueFor("slow_move_pct")
end

function modifier_hoodwink_sharpshooter_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_hoodwink_sharpshooter_custom_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_r4 == 0 then
		return
	end
	return self.ability.talents.r4_cdr
end

modifier_hoodwink_sharpshooter_custom_invun = class(mod_hidden)
function modifier_hoodwink_sharpshooter_custom_invun:CheckState()
	return {
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
	}
end

hoodwink_sharpshooter_release_custom = class({})
function hoodwink_sharpshooter_release_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "hoodwink_sharpshooter_release", self)
end

function hoodwink_sharpshooter_release_custom:OnSpellStart()
	local mod = self.caster:FindModifierByName("modifier_hoodwink_sharpshooter_custom")
	if not mod then
		return
	end
	mod:Destroy()
end