--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_phantom_assassin_phantom_strike_buff",
	"abilities/phantom_assassin/custom_phantom_assassin_phantom_strike",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_strike_passive",
	"abilities/phantom_assassin/custom_phantom_assassin_phantom_strike",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_clone",
	"abilities/phantom_assassin/custom_phantom_assassin_phantom_strike",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_strike_rush",
	"abilities/phantom_assassin/custom_phantom_assassin_phantom_strike",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_blink_4"
)
LinkLuaModifier(
	"modifier_phantom_assassin_phantom_strike_break",
	"abilities/phantom_assassin/custom_phantom_assassin_phantom_strike",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_phantom_assassin_blink_3"
)

custom_phantom_assassin_phantom_strike = class({})
custom_phantom_assassin_phantom_strike.talents = {}

function custom_phantom_assassin_phantom_strike:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_phantom_strike_end.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_phantom_strike_start.vpcf",
		context
	)
	PrecacheResource("particle", "particles/items2_fx/manta_phase.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin_persona/pa_persona_stifling_dagger.vpcf",
		context
	)
	PrecacheResource("particle", "particles/phantom_assassin/blink_illusion_blur.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blink_effect.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blink_effect_red.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_omni_slash_tgt_bladekeeper.vpcf",
		context
	)
	PrecacheResource("particle", "particles/phantom_assassin/blur_stack.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/phantom_resist_max.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/phantom_resist.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/phantom_damage.vpcf", context)
	PrecacheResource("particle", "particles/phantom_assassin/blink_refresh.vpcf", context)
	PrecacheResource("particle", "particles/muerta/gun_evasion.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/phantom_assassin/phantom_assassin_arcana_elder_smith/pa_arcana_attack_crit_blur.vpcf",
		context
	)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_phantom_assassin_persona/pa_persona_stifling_dagger_impact.vpcf",
		context
	)
end

function custom_phantom_assassin_phantom_strike:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_spell = 0,
			w1_health = 0,

			w2_cd = 0,
			w2_cast = 0,

			has_w3 = 0,
			w3_magic = 0,
			w3_damage = 0,
			w3_health = 0,
			w3_max = caster:GetTalentValue("modifier_phantom_assassin_blink_3", "max", true),
			w3_chance = caster:GetTalentValue("modifier_phantom_assassin_blink_3", "chance", true),
			w3_chance_clone = caster:GetTalentValue("modifier_phantom_assassin_blink_3", "chance_clone", true),
			w3_duration = caster:GetTalentValue("modifier_phantom_assassin_blink_3", "duration", true),

			has_w4 = 0,
			w4_move = caster:GetTalentValue("modifier_phantom_assassin_blink_4", "move", true),
			w4_heal = caster:GetTalentValue("modifier_phantom_assassin_blink_4", "heal", true),
			w4_duration = caster:GetTalentValue("modifier_phantom_assassin_blink_4", "duration", true),
			w4_chance = caster:GetTalentValue("modifier_phantom_assassin_blink_4", "chance", true),
			w4_talent_cd = caster:GetTalentValue("modifier_phantom_assassin_blink_4", "talent_cd", true),

			e2_duration = 0,

			has_w7 = 0,
			w7_cd_reduce = caster:GetTalentValue("modifier_phantom_assassin_blink_7", "cd_reduce", true) / 100,
			w7_damage = caster:GetTalentValue("modifier_phantom_assassin_blink_7", "damage", true) / 100,
			w7_damage_taken = caster:GetTalentValue("modifier_phantom_assassin_blink_7", "damage_taken", true),
			w7_delay = caster:GetTalentValue("modifier_phantom_assassin_blink_7", "delay", true),
			w7_radius = caster:GetTalentValue("modifier_phantom_assassin_blink_7", "radius", true),
			w7_speed = caster:GetTalentValue("modifier_phantom_assassin_blink_7", "speed", true),
			w7_duration_hero = caster:GetTalentValue("modifier_phantom_assassin_blink_7", "duration_hero", true),
			w7_duration_creeps = caster:GetTalentValue("modifier_phantom_assassin_blink_7", "duration_creeps", true),
		}
	end

	if caster:HasTalent("modifier_phantom_assassin_blink_1") then
		self.talents.w1_spell = caster:GetTalentValue("modifier_phantom_assassin_blink_1", "spell")
		self.talents.w1_health = caster:GetTalentValue("modifier_phantom_assassin_blink_1", "health") / 100
	end

	if caster:HasTalent("modifier_phantom_assassin_blink_2") then
		self.talents.w2_cd = caster:GetTalentValue("modifier_phantom_assassin_blink_2", "cd")
		self.talents.w2_cast = caster:GetTalentValue("modifier_phantom_assassin_blink_2", "cast") / 100
	end

	if caster:HasTalent("modifier_phantom_assassin_blink_3") then
		self.talents.has_w3 = 1
		self.talents.w3_magic = caster:GetTalentValue("modifier_phantom_assassin_blink_3", "magic")
		self.talents.w3_damage = caster:GetTalentValue("modifier_phantom_assassin_blink_3", "damage")
		self.talents.w3_health = caster:GetTalentValue("modifier_phantom_assassin_blink_3", "health") / 100
	end

	if caster:HasTalent("modifier_phantom_assassin_blink_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_phantom_assassin_blur_2") then
		self.talents.e2_duration = caster:GetTalentValue("modifier_phantom_assassin_blur_2", "duration")
	end

	if caster:HasTalent("modifier_phantom_assassin_blink_7") then
		self.talents.has_w7 = 1
	end
end

function custom_phantom_assassin_phantom_strike:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "phantom_assassin_phantom_strike", self)
end

function custom_phantom_assassin_phantom_strike:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_phantom_assassin_phantom_strike_passive"
end

function custom_phantom_assassin_phantom_strike:GetBehavior()
	return DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
end

function custom_phantom_assassin_phantom_strike:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)
end

function custom_phantom_assassin_phantom_strike:GetCastPoint()
	return self.BaseClass.GetCastPoint(self) * (1 + (self.talents.w2_cast or 0))
end

function custom_phantom_assassin_phantom_strike:GetBlinkRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget) + ((hTarget and self.range_target) or 0)
end

function custom_phantom_assassin_phantom_strike:GetCastRange(vLocation, hTarget)
	return (IsClient() or hTarget) and self:GetBlinkRange(vLocation, hTarget) or 99999
end

function custom_phantom_assassin_phantom_strike:GetCastAnimation()
	return 0
end

function custom_phantom_assassin_phantom_strike:CastFilterResultTarget(hTarget)
	if self.caster == hTarget then
		return UF_FAIL_CUSTOM
	end

	local result = UnitFilter(
		hTarget,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_CREEP,
		DOTA_UNIT_TARGET_FLAG_NONE,
		self.caster:GetTeamNumber()
	)
	if result ~= UF_SUCCESS then
		return result
	end

	return UF_SUCCESS
end

function custom_phantom_assassin_phantom_strike:GetCustomCastErrorTarget(hTarget)
	if self.caster == hTarget then
		return "#dota_hud_error_cant_cast_on_self"
	end
	return ""
end

function custom_phantom_assassin_phantom_strike:OnAbilityPhaseStart()
	if self:IsArcana() then
		self.caster:StartGesture(ACT_DOTA_CAST_ABILITY_2)
	else
		self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT, 1 + 0.3 * (1 - self.talents.w2_cast))
	end
	return true
end

function custom_phantom_assassin_phantom_strike:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(self:IsArcana() and ACT_DOTA_CAST_ABILITY_2 or ACT_DOTA_ATTACK_EVENT)
end

function custom_phantom_assassin_phantom_strike:OnSpellStart()
	if self.caster:GetQuest() == "Phantom.Quest_6" then
		self.caster:StartCd("phantom_quest_6")
	end

	local point = self.caster:CastPosition(self:GetCursorPosition())
	local target = self:GetCursorTarget()
	local start_abs = self.caster:GetAbsOrigin()
	local blinkPosition = point

	if target then
		if target:GetTeamNumber() ~= self.caster:GetTeamNumber() and target:TriggerSpellAbsorb(self) then
			return
		end

		local blinkDirection = (start_abs - target:GetOrigin()):Normalized() * 50
		blinkPosition = target:GetOrigin() + blinkDirection
	end

	local direction = blinkPosition - start_abs
	local range = self:GetBlinkRange(point, target) + self.caster:GetCastRangeBonus()

	if direction:Length2D() > range then
		blinkPosition = start_abs + direction:Normalized() * range
	end

	blinkPosition = GetGroundPosition(blinkPosition, nil)

	local buff_duration = self.duration + self.talents.e2_duration
	local buff = self.caster:FindModifierByName("modifier_phantom_assassin_phantom_strike_buff")

	if not buff or buff:GetRemainingTime() < buff_duration then
		self.caster:RemoveModifierByName("modifier_phantom_assassin_phantom_strike_buff")
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_phantom_assassin_phantom_strike_buff",
			{ duration = buff_duration }
		)
	end

	local particle_start = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_phantom_strike_start.vpcf",
		self
	)
	local effect_start = ParticleManager:CreateParticle(particle_start, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(effect_start, 0, start_abs)
	ParticleManager:ReleaseParticleIndex(effect_start)

	EmitSoundOnLocationWithCaster(start_abs, "Hero_PhantomAssassin.Strike.Start", self.caster)

	local enemies = FindUnitsInLine(
		self.caster:GetTeamNumber(),
		start_abs,
		blinkPosition,
		nil,
		self.width,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_NONE
	)

	local victim = nil
	local hero = false
	local proc = #enemies > 0
		and self.caster.crit_ability
		and self.caster.crit_ability:UseFocus(self.caster, true, target)

	for _, enemy in pairs(enemies) do
		enemy:EmitSound("PA.Blink_proc")

		local particle = ParticleManager:CreateParticle(
			"particles/econ/items/juggernaut/jugg_arcana/juggernaut_arcana_omni_slash_tgt_bladekeeper.vpcf",
			PATTACH_CUSTOMORIGIN_FOLLOW,
			enemy
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			0,
			enemy,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			enemy:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			enemy,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_hitloc",
			enemy:GetAbsOrigin(),
			true
		)
		ParticleManager:ReleaseParticleIndex(particle)

		local trail_pfx = ParticleManager:CreateParticle(
			"particles/econ/items/phantom_assassin/phantom_assassin_arcana_elder_smith/pa_arcana_attack_crit_blur.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			enemy
		)
		ParticleManager:SetParticleControl(trail_pfx, 0, self.caster:GetAbsOrigin())
		ParticleManager:SetParticleControl(trail_pfx, 1, enemy:GetAbsOrigin())
		ParticleManager:SetParticleControlForward(
			trail_pfx,
			1,
			(enemy:GetAbsOrigin() - self.caster:GetAbsOrigin()):Normalized()
		)
		ParticleManager:ReleaseParticleIndex(trail_pfx)

		local damage = self:GetDamage(enemy)

		DoDamage({
			victim = enemy,
			attacker = self.caster,
			ability = self,
			damage = damage,
			damage_type = DAMAGE_TYPE_MAGICAL,
		})

		if proc then
			self.caster.crit_ability:ApplyBleed(self.caster, enemy, damage * self:GetCreepsMult(enemy))
		end

		if self.caster.dagger_ability then
			self.caster.dagger_ability:ProcPoison(
				enemy,
				damage,
				(enemy:GetAbsOrigin() - self.caster:GetAbsOrigin()):Length2D()
			)
		end

		self:ProcMark(enemy)

		if not victim then
			victim = enemy
		end

		if not hero and enemy:IsRealHero() then
			victim = enemy
			hero = true
		end
	end

	if hero and self.caster.dagger_ability then
		self.caster.dagger_ability:AddCharge()
	end

	FindClearSpaceForUnit(self.caster, blinkPosition, true)

	if self.caster:HasModifier("modifier_phantom_assassin_phantom_smoke") then
		self.caster:Stop()
	else
		self.caster:MoveToPositionAggressive(self.caster:GetAbsOrigin())
	end

	self.caster:FacePoint(self.caster:GetAbsOrigin() + self.caster:GetForwardVector() * 10)

	local particle_end = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_phantom_assassin/phantom_assassin_phantom_strike_end.vpcf",
		self
	)
	self.caster:GenericParticle(particle_end)

	EmitSoundOnLocationWithCaster(self.caster:GetAbsOrigin(), "Hero_PhantomAssassin.Strike.End", self.caster)

	local blink_effect = "particles/phantom_assassin/blink_effect.vpcf"

	if self.caster:HasModifier("modifier_phantom_assassin_phantom_coup_de_grace_legendary") then
		blink_effect = "particles/phantom_assassin/blink_effect_red.vpcf"
	end

	local particle2 = ParticleManager:CreateParticle(blink_effect, PATTACH_WORLDORIGIN, nil)
	ParticleManager:SetParticleControl(particle2, 0, start_abs)
	ParticleManager:SetParticleControl(particle2, 1, blinkPosition)
	ParticleManager:ReleaseParticleIndex(particle2)

	if self:IsArcana() then
		self.caster:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 1 + 1 * (1 - self.talents.w2_cast))
	end

	if victim and self.talents.has_w4 == 1 then
		self.caster:RemoveModifierByName("modifier_phantom_assassin_phantom_strike_rush")
		self.caster:AddNewModifier(
			self.caster,
			self,
			"modifier_phantom_assassin_phantom_strike_rush",
			{ duration = self.talents.w4_duration }
		)

		local roll = self.caster:CheckCd("phantom_assassin_w4", self.talents.w4_talent_cd, self.talents.w4_chance, 1225)
		self.caster:LogProc("modifier_phantom_assassin_blink_4", roll and 1 or 0)

		if roll then
			local effect = ParticleManager:CreateParticle(
				"particles/phantom_assassin/blink_refresh.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
				self.parent
			)
			ParticleManager:SetParticleControlEnt(
				effect,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(effect)
			self.parent:EmitSound("PA.Strike_refresh")
			self:EndCd(0.2)
		end
	end

	if self.talents.has_w7 ~= 1 then
		return
	end
	if not victim then
		return
	end

	self:CloneVolley(victim)
	self:CreateClone(start_abs, hero)
	self.caster:CdAbility(self, nil, self.talents.w7_cd_reduce, "modifier_phantom_assassin_blink_7")
end

function custom_phantom_assassin_phantom_strike:OnProjectileHit_ExtraData(hTarget, vLocation, table)
	if not IsServer() then
		return
	end
	if not hTarget then
		return
	end

	local clone = EntIndexToHScript(table.clone)

	if not IsValid(clone) then
		clone = self.caster
	end

	local enemies = self.caster:FindTargets(self.talents.w7_radius, hTarget:GetAbsOrigin())

	for _, enemy in pairs(enemies) do
		local damage = self:GetDamage(enemy) * self.talents.w7_damage

		DoDamage(
			{
				victim = enemy,
				attacker = self.caster,
				ability = self,
				damage = damage,
				damage_type = DAMAGE_TYPE_MAGICAL,
			},
			"modifier_phantom_assassin_blink_7"
		)

		if enemy == hTarget then
			self.caster:LogProc("modifier_phantom_assassin_blink_7", table.crit and 1 or 0, enemy)
			self:ProcMark(enemy, true)

			if self.caster.dagger_ability then
				self.caster.dagger_ability:ProcPoison(enemy, damage, table.distance)
			end

			if table.crit then
				self.caster.crit_ability:ApplyBleed(clone, enemy, damage * self:GetCreepsMult(enemy))
			end
		else
			local particle = ParticleManager:CreateParticle(
				"particles/units/heroes/hero_phantom_assassin_persona/pa_persona_stifling_dagger_impact.vpcf",
				PATTACH_CUSTOMORIGIN_FOLLOW,
				enemy
			)
			ParticleManager:SetParticleControlEnt(
				particle,
				3,
				enemy,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				enemy:GetAbsOrigin(),
				true
			)
			ParticleManager:ReleaseParticleIndex(particle)
		end
	end

	hTarget:EmitSound("Hero_PhantomAssassin.Dagger.Target")
end

function custom_phantom_assassin_phantom_strike:IsArcana()
	return self.caster:GetModelName() ~= "models/heroes/phantom_assassin/phantom_assassin.vmdl"
end

function custom_phantom_assassin_phantom_strike:GetDamage()
	return self.damage + self.caster:GetMaxHealth() * self.talents.w1_health
end

function custom_phantom_assassin_phantom_strike:ProcMark(target, clone)
	if not IsServer() then
		return
	end
	if self.talents.has_w3 ~= 1 then
		return
	end

	local chance = clone and self.talents.w3_chance_clone or self.talents.w3_chance
	local index = clone and 1227 or 1226

	local roll = RollPseudoRandomPercentage(chance, index, self.caster)

	if not roll then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_phantom_assassin_phantom_strike_break",
		{ duration = self.talents.w3_duration * (1 - target:GetStatusResistance()) }
	)
	target:EmitSound("PA.Strike_proc")
	target:GenericParticle("particles/phantom_assassin/phantom_damage.vpcf")
	DoDamage(
		{
			victim = target,
			attacker = self.caster,
			ability = self,
			damage = self.talents.w3_damage + self.caster:GetMaxHealth() * self.talents.w3_health,
			damage_type = DAMAGE_TYPE_MAGICAL,
		},
		"modifier_phantom_assassin_blink_3"
	)
end

function custom_phantom_assassin_phantom_strike:CreateClone(point, hero)
	if not IsServer() then
		return
	end

	local duration = hero and self.talents.w7_duration_hero or self.talents.w7_duration_creeps

	local illusions = CreateIllusions(
		self.caster,
		self.caster,
		{ outgoing_damage = 0, incoming_damage = self.talents.w7_damage_taken - 100, duration = duration },
		1,
		0,
		false,
		false
	)

	for _, illusion in pairs(illusions) do
		illusion.owner = self.caster
		illusion:AddNewModifier(self.caster, self, "modifier_phantom_assassin_phantom_clone", { duration = duration })
		illusion:SetOwner(nil)

		if self.caster.crit_ability then
			self.caster.crit_ability:RollFocus(illusion, self.caster.crit_ability.ability_crit_chance)
		end

		illusion:SetHealth(illusion:GetMaxHealth())

		if self:IsArcana() then
			illusion:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK, 2)
		else
			illusion:StartGestureWithPlaybackRate(ACT_DOTA_ATTACK_EVENT, 1.8)
		end
		FindClearSpaceForUnit(illusion, point, true)
	end
end

function custom_phantom_assassin_phantom_strike:CloneVolley(target)
	if not IsServer() then
		return
	end
	if not self.caster.blink_clones then
		return
	end

	local volley = {}

	for _, mod in pairs(self.caster.blink_clones) do
		if IsValid(mod) then
			table.insert(volley, mod)
		end
	end

	if #volley == 0 then
		return
	end

	volley[1]:Aim(target)

	local index = 1

	Timers:CreateTimer(self.talents.w7_delay, function()
		if not IsValid(target) or not target:IsAlive() then
			return
		end

		volley[index]:Dagger(target)

		index = index + 1

		if not volley[index] then
			return
		end

		volley[index]:Aim(target)

		return self.talents.w7_delay
	end)
end

modifier_phantom_assassin_phantom_strike_passive = class(mod_hidden)
function modifier_phantom_assassin_phantom_strike_passive:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.blink_ability = self.ability

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.width = self.ability:GetSpecialValueFor("width")
	self.ability.speed = self.ability:GetSpecialValueFor("speed")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.range_target = self.ability:GetSpecialValueFor("range_target")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100

	self.ability.clones = 0
	self.parent:LogWatch("modifier_phantom_assassin_blink_7", self.ability, "clones")
end

function modifier_phantom_assassin_phantom_strike_passive:OnRefresh()
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.speed = self.ability:GetSpecialValueFor("speed")
end

function modifier_phantom_assassin_phantom_strike_passive:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_phantom_assassin_phantom_strike_passive:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.w1_spell or 0
end

modifier_phantom_assassin_phantom_strike_buff = class(mod_visible)
function modifier_phantom_assassin_phantom_strike_buff:IsPurgable()
	return true
end
function modifier_phantom_assassin_phantom_strike_buff:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
end

function modifier_phantom_assassin_phantom_strike_buff:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_phantom_assassin_phantom_strike_buff:GetActivityTranslationModifiers()
	return "phantom_attack"
end

function modifier_phantom_assassin_phantom_strike_buff:GetModifierAttackSpeedBonus_Constant()
	return self.ability.speed or 0
end

modifier_phantom_assassin_phantom_strike_break = class(mod_visible)
function modifier_phantom_assassin_phantom_strike_break:GetTexture()
	return "buffs/phantom_assassin/phantom_3"
end
function modifier_phantom_assassin_phantom_strike_break:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end

	self.RemoveForDuel = true
	self.particle = self.parent:GenericParticle("particles/phantom_assassin/blur_stack.vpcf", self, true)

	self:OnRefresh()
end

function modifier_phantom_assassin_phantom_strike_break:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.ability.talents.w3_max then
		return
	end

	self:IncrementStackCount()

	if self:GetStackCount() < self.ability.talents.w3_max then
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
		return
	end

	ParticleManager:DestroyParticle(self.particle, false)
	ParticleManager:ReleaseParticleIndex(self.particle)
	self.particle = nil

	self.parent:EmitSound("PA.Strike_resist")
	self.parent:GenericParticle("particles/phantom_assassin/phantom_resist.vpcf", self, true)
	self.parent:GenericParticle("particles/phantom_assassin/phantom_resist_max.vpcf", self)
end

function modifier_phantom_assassin_phantom_strike_break:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
	}
end

function modifier_phantom_assassin_phantom_strike_break:GetModifierMagicalResistanceBonus()
	return self.ability.talents.w3_magic * self:GetStackCount()
end

modifier_phantom_assassin_phantom_strike_rush = class(mod_visible)
function modifier_phantom_assassin_phantom_strike_rush:GetTexture()
	return "buffs/phantom_assassin/phantom_4"
end
function modifier_phantom_assassin_phantom_strike_rush:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/muerta/gun_evasion.vpcf", self)
end

function modifier_phantom_assassin_phantom_strike_rush:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
	}
end

function modifier_phantom_assassin_phantom_strike_rush:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.w4_move
end

function modifier_phantom_assassin_phantom_strike_rush:GetModifierHealthRegenPercentage()
	return self.ability.talents.w4_heal / self.ability.talents.w4_duration
end

modifier_phantom_assassin_phantom_clone = class(mod_hidden)
function modifier_phantom_assassin_phantom_clone:GetStatusEffectName()
	return "particles/status_fx/status_effect_phantom_assassin_active_blur.vpcf"
end
function modifier_phantom_assassin_phantom_clone:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_phantom_assassin_phantom_clone:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end

	if not self.caster.blink_clones then
		self.caster.blink_clones = {}
	end

	self.caster.blink_clones[self.parent] = self
	self.ability.clones = self.ability.clones + 1

	self.parent:GenericParticle("particles/phantom_assassin/blink_illusion_blur.vpcf", self)
end

function modifier_phantom_assassin_phantom_clone:OnDestroy()
	if not IsServer() then
		return
	end

	self.caster.blink_clones[self.parent] = nil
	self.ability.clones = self.ability.clones - 1
end

function modifier_phantom_assassin_phantom_clone:Aim(target)
	if not IsValid(self.parent) then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	self.parent:FacePoint(target:GetAbsOrigin())
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_1)
end

function modifier_phantom_assassin_phantom_clone:Dagger(target)
	if not IsValid(self.parent) then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	local crit = self.caster.crit_ability and self.caster.crit_ability:UseFocus(self.parent, true)

	local info = {
		Target = target,
		Source = self.parent,
		Ability = self.ability,
		EffectName = "particles/units/heroes/hero_phantom_assassin_persona/pa_persona_stifling_dagger.vpcf",
		iMoveSpeed = self.ability.talents.w7_speed,
		bReplaceExisting = false,
		bProvidesVision = true,
		iVisionRadius = 450,
		bDodgeable = true,
		iVisionTeamNumber = self.parent:GetTeamNumber(),
		ExtraData = {
			clone = self.parent:GetEntityIndex(),
			crit = crit,
			distance = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D(),
		},
	}
	ProjectileManager:CreateTrackingProjectile(info)

	self.parent:EmitSound("Hero_PhantomAssassin.Dagger.Cast")
end

function modifier_phantom_assassin_phantom_clone:CheckState()
	return {
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_ROOTED] = true,
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end