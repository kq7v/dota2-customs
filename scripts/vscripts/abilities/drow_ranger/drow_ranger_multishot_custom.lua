--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_drow_ranger_multishot_custom",
	"abilities/drow_ranger/drow_ranger_multishot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_drow_ranger_multishot_custom_tracker",
	"abilities/drow_ranger/drow_ranger_multishot_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_drow_ranger_multishot_custom_legendary",
	"abilities/drow_ranger/drow_ranger_multishot_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_drow_multishot_7"
)

drow_ranger_multishot_custom = class({})
drow_ranger_multishot_custom.talents = {}
drow_ranger_multishot_custom.cast_data = {}
drow_ranger_multishot_custom.cast_index = 0

function drow_ranger_multishot_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/drow_ranger/multi_proj_scepter.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/multi_scepter_proc_red_low.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/multi_refresh.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/multi_damage_reduce.vpcf", context)
	PrecacheResource("particle", "particles/drow_ranger/multi_armor.vpcf", context)
	PrecacheResource("particle", "particles/zeus/zuus_speed.vpcf", context)
	PrecacheResource("particle", "particles/crystal_maiden/frostbite_legendary_stack.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf",
		context
	)
end

function drow_ranger_multishot_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			e1_damage = 0,
			e1_heal = 0,

			e2_cd = 0,
			e2_range = 0,

			has_e3 = 0,
			e3_damage = 0,
			e3_max = 0,
			e3_damage_type = caster:GetTalentValue("modifier_drow_multishot_3", "damage_type", true),

			has_e4 = 0,
			e4_damage_reduce = caster:GetTalentValue("modifier_drow_multishot_4", "damage_reduce", true),
			e4_cdr = caster:GetTalentValue("modifier_drow_multishot_4", "cdr", true),
			e4_cd_items = caster:GetTalentValue("modifier_drow_multishot_4", "cd_items", true),

			has_e7 = 0,
			e7_cd = caster:GetTalentValue("modifier_drow_multishot_7", "cd", true) / 100,
			e7_max = caster:GetTalentValue("modifier_drow_multishot_7", "max", true),
			e7_damage = caster:GetTalentValue("modifier_drow_multishot_7", "damage", true) / 100,
			e7_fear = caster:GetTalentValue("modifier_drow_multishot_7", "fear", true),
			e7_duration = caster:GetTalentValue("modifier_drow_multishot_7", "duration", true),

			has_q7 = 0,

			r2_range = 0,
		}
	end

	if caster:HasTalent("modifier_drow_multishot_1") then
		self.talents.e1_damage = caster:GetTalentValue("modifier_drow_multishot_1", "damage") / 100
		self.talents.e1_heal = caster:GetTalentValue("modifier_drow_multishot_1", "heal") / 100
		caster:AddLifesteal(
			self.tracker,
			{ name = "modifier_drow_multishot_1", type = 1, value = self.talents.e1_heal, text = true }
		)
	end

	if caster:HasTalent("modifier_drow_multishot_2") then
		self.talents.e2_cd = caster:GetTalentValue("modifier_drow_multishot_2", "cd")
		self.talents.e2_range = caster:GetTalentValue("modifier_drow_multishot_2", "range")
	end

	if caster:HasTalent("modifier_drow_multishot_3") then
		self.talents.has_e3 = 1
		self.talents.e3_max = caster:GetTalentValue("modifier_drow_multishot_3", "max")
		self.talents.e3_damage = caster:GetTalentValue("modifier_drow_multishot_3", "damage") / 100
	end

	if caster:HasTalent("modifier_drow_multishot_4") then
		self.talents.has_e4 = 1
	end

	if caster:HasTalent("modifier_drow_multishot_7") then
		self.talents.has_e7 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_drow_frost_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_drow_marksman_2") then
		self.talents.r2_range = caster:GetTalentValue("modifier_drow_marksman_2", "range")
	end
end

function drow_ranger_multishot_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "drow_ranger_multishot", self)
end

function drow_ranger_multishot_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_drow_ranger_multishot_custom_tracker"
end

function drow_ranger_multishot_custom:GetManaCost(iLevel)
	return self.AbilityManaCost or 0
end

function drow_ranger_multishot_custom:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.e2_cd or 0)
end

function drow_ranger_multishot_custom:GetCastAnimation()
	return 0
end

function drow_ranger_multishot_custom:GetRange()
	if not self.arrow_range_multiplier then
		return 0
	end
	return (self.caster:Script_GetAttackRange() - (self.talents.r2_range or 0)) * self.arrow_range_multiplier
		+ self.arrow_width
		+ (self.talents.e2_range or 0)
end

function drow_ranger_multishot_custom:GetCastRange(vLocation, hTarget)
	return self:GetRange() - self.caster:GetCastRangeBonus()
end

function drow_ranger_multishot_custom:OnSpellStart()
	local point = self:GetCursorPosition()

	if point == self.caster:GetAbsOrigin() then
		point = self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10
	end

	self.caster:FacePoint(point)

	self.modifier = self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_drow_ranger_multishot_custom",
		{ duration = self.duration }
	)
end

function drow_ranger_multishot_custom:OnProjectileHit_ExtraData(target, location, data)
	local index = data.index
	local hit = false

	if not self.cast_data[index] then
		return
	end

	if target and self.cast_data[index].targets[target:entindex()] ~= data.wave then
		self.cast_data[index].targets[target:entindex()] = data.wave
		local damage = self.arrow_damage_pct + self.talents.e1_damage
		local bonus = 0

		if data.gust_proc == 1 and IsValid(self.caster.gust_ability) then
			self.caster.gust_ability:ProcDamage(target)
		end

		if data.frost == 1 then
			local frost = self.caster.frost_arrow_ability
			if IsValid(frost) then
				bonus = bonus + frost.damage
				frost:ApplySlow(target)
			end
		end

		damage = (self.caster:GetAttackDamage() + bonus) * damage

		local mod = target:FindModifierByName("modifier_drow_ranger_multishot_custom_legendary")
		if mod and mod.max and mod:GetStackCount() >= (mod.max - 1) then
			if not mod.feared then
				mod.feared = true
				target:EmitSound("Generic.Fear")
				target:AddNewModifier(
					self.caster,
					nil,
					"modifier_nevermore_requiem_fear",
					{ duration = self.talents.e7_fear * (1 - target:GetStatusResistance()) }
				)
			end
			damage = damage * (1 + self.talents.e7_damage)
			target:EmitSound("Drow.Multi_scepter_proc_damage")
		end

		local damageTable = {
			victim = target,
			attacker = self.caster,
			damage = damage,
			damage_type = DAMAGE_TYPE_PHYSICAL,
			ability = self,
			damage_flags = DOTA_DAMAGE_FLAG_BYPASSES_PHYSICAL_BLOCK,
		}
		DoDamage(damageTable)

		if data.pure_bonus == 1 then
			damageTable.damage = damage * self.talents.e3_damage
			damageTable.damage_type = self.talents.e3_damage_type
			local real_damage = DoDamage(damageTable, "modifier_drow_multishot_3")
			target:SendNumber(6, real_damage)
			target:EmitSound("DOTA_Item.Daedelus.Crit")
		end

		target:EmitSound("Hero_DrowRanger.ProjectileImpact")
		hit = true
	end

	if hit == true or not target then
		self.cast_data[index].count = self.cast_data[index].count + 1
	end

	self:CheckData(index)
	return hit
end

function drow_ranger_multishot_custom:OnChannelFinish(bInterrupted)
	if IsValid(self.modifier) then
		self.modifier:Destroy()
	end
end

function drow_ranger_multishot_custom:CheckData(index)
	if not IsServer() then
		return
	end
	if not self.cast_data[index] then
		return
	end
	if self.cast_data[index].count >= self.cast_data[index].max then
		if self.talents.has_e7 == 1 then
			for entindex, _ in pairs(self.cast_data[index].targets) do
				local target = EntIndexToHScript(entindex)
				if IsValid(target) then
					target:AddNewModifier(
						self.caster,
						self,
						"modifier_drow_ranger_multishot_custom_legendary",
						{ duration = self.talents.e7_duration }
					)
				end
			end
		end

		self.cast_data[index] = nil
	end
end

modifier_drow_ranger_multishot_custom = class(mod_visible)
function modifier_drow_ranger_multishot_custom:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_drow_ranger_multishot_custom:OnCreated(kv)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.width = self.ability.arrow_width
	self.speed = self.ability.arrow_speed
	self.wave = self.ability.wave_count + self.ability.talents.e3_max
	self.arrows = self.ability.arrow_count_per_wave
	self.duration = self.ability.duration
	self.move_reduce = self.ability.move_reduce

	if self.parent:HasShard() then
		self.move_reduce = self.ability.shard_move
		self.arrows = self.arrows + self.ability.shard_count
	end

	local delay = 0.1
	self.angle = self.arrows * 8.33

	if not IsServer() then
		return
	end
	self.index = self.ability.cast_index + 1
	self.ability.cast_index = self.index
	if self.ability.cast_index >= 10 then
		self.ability.cast_index = 0
	end

	self.ability.cast_data[self.index] = {}
	self.ability.cast_data[self.index].count = 0
	self.ability.cast_data[self.index].max = self.wave * self.arrows
	self.ability.cast_data[self.index].targets = {}

	self.ability:EndCd()

	local anim_k = 0.9 + 0.05 * (self.wave - self.ability.wave_count)

	self.parent:StartGestureWithPlaybackRate(ACT_DOTA_CHANNEL_ABILITY_3, anim_k)
	self.wave_delay = (self.duration - delay) / self.wave

	self.current_wave = 0
	self.real_max = 0
	self.pure_bonus = 0

	self.frost = 0
	if IsValid(self.parent.frost_arrow_ability) and self.parent.frost_arrow_ability:IsTrained() then
		self.frost = 1
	end

	self.info = {
		Source = self.parent,
		Ability = self.ability,

		bDeleteOnHit = true,

		iUnitTargetTeam = self.ability:GetAbilityTargetTeam(),
		iUnitTargetType = self.ability:GetAbilityTargetType(),
		iUnitTargetFlags = DOTA_UNIT_TARGET_FLAG_NONE,

		fDistance = self.ability:GetRange(),
		fStartRadius = self.width,
		fEndRadius = self.width,

		bProvidesVision = true,
		iVisionRadius = self.width,
		iVisionTeamNumber = self.parent:GetTeamNumber(),
	}

	self.parent:AddSpellEvent(self, true)

	self:StartIntervalThink(delay)
	self.parent:EmitSound("Hero_DrowRanger.Multishot.Channel")
end

function modifier_drow_ranger_multishot_custom:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if self.parent:HasShard() then
		return
	end

	self:Destroy()
end

function modifier_drow_ranger_multishot_custom:OnDestroy()
	if not IsServer() then
		return
	end

	if self.ability.cast_data[self.index] then
		self.ability.cast_data[self.index].max = self.real_max
		self.ability:CheckData(self.index)
	end

	if self.parent:HasShard() then
		self.parent:Purge(false, true, false, false, false)
		self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_dispel_magic.vpcf")
	end

	self.ability:StartCd()
	self.parent:FadeGesture(ACT_DOTA_CHANNEL_ABILITY_3)
	self.parent:StopSound("Hero_DrowRanger.Multishot.Channel")
end

function modifier_drow_ranger_multishot_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.current_wave >= self.wave then
		return
	end

	if
		not self.parent:HasShard()
		and (
			self.parent:IsStunned()
			or self.parent:IsSilenced()
			or self.parent:IsHexed()
			or self.parent:IsFeared()
			or self.parent:GetForceAttackTarget()
		)
	then
		self:Destroy()
		return
	end

	self.current_wave = self.current_wave + 1

	if self.ability.talents.has_e3 == 1 and self.current_wave >= self.wave then
		self.pure_bonus = 1
	end

	if self.ability.talents.has_e4 == 1 then
		self.parent:CdItems(self.ability.talents.e4_cd_items, "modifier_drow_multishot_4")
	end

	if IsValid(self.parent.frost_arrow_ability) then
		self.parent.frost_arrow_ability:ApplyHaste()
	end

	if IsValid(self.parent.marksmanship_ability) then
		self.parent.marksmanship_ability:LegendaryStack()
	end

	local gust_proc = 0
	local mod = self.parent:FindModifierByName("modifier_drow_ranger_wave_of_silence_custom_attacks")
	if mod then
		gust_proc = 1
		mod:DecrementStackCount()
		if mod:GetStackCount() <= 0 then
			mod:Destroy()
		end
	end

	local effect = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/drow_ranger/multi_proj_scepter.vpcf",
		self
	)
	local sound = "Hero_DrowRanger.Multishot.Attack"
	if self.pure_bonus == 1 then
		effect = "particles/drow_ranger/multi_scepter_proc_red_low.vpcf"
		sound = "Drow.Multi_scepter_proc"
	end

	for i = 1, self.arrows do
		local info = self.info
		local step = self.angle / (self.arrows - 1)
		local angle = -self.angle / 2 + (i - 1) * step

		self.direction = self.parent:GetForwardVector()
		self.direction.z = 0

		local projectile_direction = RotatePosition(Vector(0, 0, 0), QAngle(0, angle, 0), self.direction)

		info.EffectName = effect
		info.vSpawnOrigin = self.parent:GetAttachmentOrigin(self.parent:ScriptLookupAttachment("attach_hitloc"))
		if
			info.EffectName ~= "particles/drow_ranger/multi_proj_scepter.vpcf"
			and info.EffectName ~= "particles/drow_ranger/multi_scepter_proc_red_low.vpcf"
		then
			info.vSpawnOrigin = info.vSpawnOrigin + Vector(0, 0, -30)
		end

		info.vVelocity = projectile_direction * self.speed
		info.ExtraData = {
			wave = self.current_wave,
			frost = self.frost,
			pure_bonus = self.pure_bonus,
			index = self.index,
			gust_proc = gust_proc,
		}

		ProjectileManager:CreateLinearProjectile(info)
		self.real_max = self.real_max + 1
		self.parent:EmitSound(sound)
	end
	self:StartIntervalThink(self.wave_delay - FrameTime())
end

function modifier_drow_ranger_multishot_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_IGNORE_CAST_ANGLE,
		MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_drow_ranger_multishot_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.move_reduce
end

function modifier_drow_ranger_multishot_custom:GetModifierIgnoreCastAngle()
	return 1
end

function modifier_drow_ranger_multishot_custom:GetModifierDisableTurning()
	return 1
end

function modifier_drow_ranger_multishot_custom:GetActivityTranslationModifiers()
	return "sidestep"
end

function modifier_drow_ranger_multishot_custom:GetModifierIncomingDamage_Percentage()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_damage_reduce
end

function modifier_drow_ranger_multishot_custom:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
	}
end

function modifier_drow_ranger_multishot_custom:GetEffectName()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return "particles/drow_ranger/multi_damage_reduce.vpcf"
end

function modifier_drow_ranger_multishot_custom:GetStatusEffectName()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return "particles/econ/items/drow/drow_ti9_immortal/status_effect_drow_ti9_frost_arrow.vpcf"
end

modifier_drow_ranger_multishot_custom_tracker = class(mod_hidden)
function modifier_drow_ranger_multishot_custom_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.wave_count = self.ability:GetSpecialValueFor("wave_count")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.ability.arrow_count_per_wave = self.ability:GetSpecialValueFor("arrow_count_per_wave")
	self.ability.arrow_damage_pct = self.ability:GetSpecialValueFor("arrow_damage_pct") / 100
	self.ability.arrow_slow_duration = self.ability:GetSpecialValueFor("arrow_slow_duration")
	self.ability.arrow_width = self.ability:GetSpecialValueFor("arrow_width")
	self.ability.arrow_speed = self.ability:GetSpecialValueFor("arrow_speed")
	self.ability.arrow_range_multiplier = self.ability:GetSpecialValueFor("arrow_range_multiplier")
	self.ability.arrow_angle = self.ability:GetSpecialValueFor("arrow_angle")
	self.ability.shard_count = self.ability:GetSpecialValueFor("shard_count")
	self.ability.AbilityManaCost = self.ability:GetSpecialValueFor("AbilityManaCost")
	self.ability.move_reduce = self.ability:GetSpecialValueFor("move_reduce")
	self.ability.shard_move = self.ability:GetSpecialValueFor("shard_move")
end

function modifier_drow_ranger_multishot_custom_tracker:OnRefresh()
	self.ability.arrow_damage_pct = self.ability:GetSpecialValueFor("arrow_damage_pct") / 100
	self.ability.arrow_slow_duration = self.ability:GetSpecialValueFor("arrow_slow_duration")
	self.ability.AbilityManaCost = self.ability:GetSpecialValueFor("AbilityManaCost")
end

function modifier_drow_ranger_multishot_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_e7 == 0 then
		return
	end
	if params.unit ~= self.parent then
		return
	end
	if self.ability == params.ability then
		return
	end
	if self.ability:GetCooldownTimeRemaining() <= 0 then
		return
	end

	local cd = self.parent:CdAbility(self.ability, nil, self.ability.talents.e7_cd, "modifier_drow_multishot_7")

	if cd then
		local particle = ParticleManager:CreateParticle(
			"particles/drow_ranger/multi_refresh.vpcf",
			PATTACH_CUSTOMORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_hitloc",
			self.parent:GetOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)
	end
end

function modifier_drow_ranger_multishot_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_drow_ranger_multishot_custom_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_e4 == 0 then
		return
	end
	return self.ability.talents.e4_cdr
end

function modifier_drow_ranger_multishot_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.e2_range
end

modifier_drow_ranger_multishot_custom_legendary = class(mod_visible)
function modifier_drow_ranger_multishot_custom_legendary:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.e7_max
	self.feared = false

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	if self.ability.talents.has_q7 == 0 then
		self.effect_cast =
			self.parent:GenericParticle("particles/crystal_maiden/frostbite_legendary_stack.vpcf", self, true)
	end

	self:OnRefresh()
end

function modifier_drow_ranger_multishot_custom_legendary:OnRefresh()
	if not IsServer() then
		return
	end
	self:IncrementStackCount()

	if self.effect_cast then
		ParticleManager:SetParticleControl(self.effect_cast, 1, Vector(0, self:GetStackCount(), 0))
	end

	if self:GetStackCount() >= self.max then
		self:Destroy()
	end
end

function modifier_drow_ranger_multishot_custom_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOOLTIP,
	}
end

function modifier_drow_ranger_multishot_custom_legendary:OnTooltip()
	return self.max
end