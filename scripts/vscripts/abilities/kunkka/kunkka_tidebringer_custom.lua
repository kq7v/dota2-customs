--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_tracker",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_cd",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_slow",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_tidebringer_2"
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_target",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_target_attack",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_armor",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_tidebringer_3"
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_root",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_tidebringer_4"
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_legendary",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_kunkka_tidebringer_7"
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_waves",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_kunkka_tidebringer_7" }
)
LinkLuaModifier(
	"modifier_kunkka_tidebringer_custom_wave_armor",
	"abilities/kunkka/kunkka_tidebringer_custom",
	LUA_MODIFIER_MOTION_NONE
)

kunkka_tidebringer_custom = class({})
kunkka_tidebringer_custom.talents = {}

function kunkka_tidebringer_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/units/heroes/hero_kunkka/kunkka_weapon_tidebringer.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tidehunter/tidehunter_gush_splash_mid.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tidehunter/tidehunter_krakenshell_purge.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/tidebringer_root.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_kunkka/kunkka_shard_tidal_wave.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/oracle/oracle_fortune_ti7/oracle_fortune_ti7_purge_root_pnt.vpcf",
		context
	)
	PrecacheResource("particle", "particles/kunkka/tidebringer_root_start.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/tidebringer_refresh.vpcf", context)
	PrecacheResource("particle", "particles/morphling/wave_health_reducea.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/tidehunter_legendary_ready.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/tidebringer_legendary_buff.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/tidebringer_legendary_buff_2.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_siren/naga_siren_riptide.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_kunkka/kunkka_spell_tidebringer.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_tidehunter/tidehunter_gush_slow.vpcf", context)
	PrecacheResource("particle", "particles/kunkka/xmark_proc.vpcf", context)
end

function kunkka_tidebringer_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_damage = 0,
			w1_cleave = 0,
			w1_damage_wave = 0,

			has_w2 = 0,
			w2_cd = 0,
			w2_cd_legendary = 0,
			w2_slow = 0,
			w2_duration = caster:GetTalentValue("modifier_kunkka_tidebringer_2", "duration", true),

			has_w3 = 0,
			w3_chance = 0,
			w3_armor = 0,
			w3_procs = caster:GetTalentValue("modifier_kunkka_tidebringer_3", "procs", true),
			w3_max = caster:GetTalentValue("modifier_kunkka_tidebringer_3", "max", true),
			w3_duration = caster:GetTalentValue("modifier_kunkka_tidebringer_3", "duration", true),

			has_w4 = 0,
			w4_distance = caster:GetTalentValue("modifier_kunkka_tidebringer_4", "distance", true),
			w4_root = caster:GetTalentValue("modifier_kunkka_tidebringer_4", "root", true),
			w4_talent_cd = caster:GetTalentValue("modifier_kunkka_tidebringer_4", "talent_cd", true),

			has_w7 = 0,
			w7_cd = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "cd", true),
			w7_hits = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "hits", true),
			w7_max = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "max", true),
			w7_duration = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "duration", true),
			w7_waves = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "waves", true),
			w7_wave_duration = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "wave_duration", true),
			w7_damage = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "damage", true),
		}
	end

	if caster:HasTalent("modifier_kunkka_tidebringer_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_kunkka_tidebringer_1", "damage")
		self.talents.w1_cleave = caster:GetTalentValue("modifier_kunkka_tidebringer_1", "cleave") / 100
		self.talents.w1_damage_wave = caster:GetTalentValue("modifier_kunkka_tidebringer_1", "damage_wave")
	end

	if caster:HasTalent("modifier_kunkka_tidebringer_2") then
		self.talents.has_w2 = 1
		self.talents.w2_cd = caster:GetTalentValue("modifier_kunkka_tidebringer_2", "cd")
		self.talents.w2_cd_legendary = caster:GetTalentValue("modifier_kunkka_tidebringer_2", "cd_legendary") / 100
		self.talents.w2_slow = caster:GetTalentValue("modifier_kunkka_tidebringer_2", "slow")
	end

	if caster:HasTalent("modifier_kunkka_tidebringer_3") then
		self.talents.has_w3 = 1
		self.talents.w3_chance = caster:GetTalentValue("modifier_kunkka_tidebringer_3", "chance")
		self.talents.w3_armor = caster:GetTalentValue("modifier_kunkka_tidebringer_3", "armor")
		caster:AddProc(self.tracker, { land = true, ally = true })
	end

	if caster:HasTalent("modifier_kunkka_tidebringer_4") then
		self.talents.has_w4 = 1
		self.attack_lifesteal = true
	end

	if caster:HasTalent("modifier_kunkka_tidebringer_7") then
		self.talents.has_w7 = 1
		if IsServer() and not self.w7_init then
			self.w7_init = true
			self.tracker:UpdateUI()
		end
	end
end

function kunkka_tidebringer_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "kunkka_tidebringer", self)
end

function kunkka_tidebringer_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_kunkka_tidebringer_custom_tracker"
end

function kunkka_tidebringer_custom:GetCooldown(iLevel)
	local cd = self.BaseClass.GetCooldown(self, iLevel)

	if self.talents.has_w7 ~= 1 then
		return cd + (self.talents.w2_cd or 0)
	end

	return (cd + self.talents.w7_cd) * (1 + self.talents.w2_cd_legendary)
end

function kunkka_tidebringer_custom:OnSpellStart()
	local point = self.caster:CastPosition(self:GetCursorPosition())

	local target =
		CreateUnitByName("npc_kunkka_tidebringer_target_custom", point, true, nil, nil, self.caster:GetTeamNumber())
	target.player_unit = true
	target.is_kunkka_target = true
	target.kunkka_caster = self.caster

	target:AddNewModifier(self.caster, self, "modifier_kunkka_tidebringer_custom_target", {})
	target:AddNewModifier(target, self, "modifier_kill", { duration = self.target_duration })

	if IsValid(self.caster.torrent_ability) then
		self.caster.torrent_ability:CreateTrail(GetGroundPosition(point, nil))
	end
end

function kunkka_tidebringer_custom:ProcSlow(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w2 == 0 then
		return
	end
	target:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_tidebringer_custom_slow",
		{ duration = self.talents.w2_duration }
	)
end

function kunkka_tidebringer_custom:ProcArmor(target)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end
	if target:GetTeamNumber() == self.caster:GetTeamNumber() then
		return
	end

	target:AddNewModifier(
		self.caster,
		self,
		"modifier_kunkka_tidebringer_custom_armor",
		{ duration = self.talents.w3_duration }
	)
end

modifier_kunkka_tidebringer_custom_tracker = class(mod_hidden)
function modifier_kunkka_tidebringer_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.tidebringer_ability = self.ability
	self.parent.tidebringer_legendary_ability = self.parent:FindAbilityByName("kunkka_tidal_wave_custom")

	if IsValid(self.parent.tidebringer_legendary_ability) then
		if IsServer() and not self.parent.tidebringer_legendary_ability:IsTrained() then
			self.parent.tidebringer_legendary_ability:SetLevel(1)
		end
		self.parent.tidebringer_legendary_ability:UpdateTalents()
	end

	self.ability.damage_bonus = self.ability:GetSpecialValueFor("damage_bonus")
	self.ability.attack_cd = self.ability:GetSpecialValueFor("attack_cd")
	self.ability.cleave_starting_width = self.ability:GetSpecialValueFor("cleave_starting_width")
	self.ability.cleave_ending_width = self.ability:GetSpecialValueFor("cleave_ending_width")
	self.ability.cleave_distance = self.ability:GetSpecialValueFor("cleave_distance")
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100
	self.ability.target_duration = self.ability:GetSpecialValueFor("target_duration")
	self.ability.target_hits = self.ability:GetSpecialValueFor("target_hits")
	self.ability.target_attack_speed = self.ability:GetSpecialValueFor("target_attack_speed")
	self.ability.target_radius = self.ability:GetSpecialValueFor("target_radius")

	self:CheckEffect()

	self.parent:AddAttackRecordEvent_out(self)
	self.parent:AddProc(self, { name = "hit", land = true, sync = true, extra = false, ally = true })
	self.parent:AddOrderFilter(self)
end

function modifier_kunkka_tidebringer_custom_tracker:OnRefresh(table)
	self.ability.damage_bonus = self.ability:GetSpecialValueFor("damage_bonus")
	self.ability.attack_cd = self.ability:GetSpecialValueFor("attack_cd")
	self.ability.cleave_damage = self.ability:GetSpecialValueFor("cleave_damage") / 100
	self.ability.cleave_distance = self.ability:GetSpecialValueFor("cleave_distance")
	self.ability.cleave_ending_width = self.ability:GetSpecialValueFor("cleave_ending_width")
end

function modifier_kunkka_tidebringer_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_w7 == 0 then
		return
	end

	if self.parent:HasModifier("modifier_kunkka_tidebringer_custom_waves") then
		self.parent:UpdateUIlong({ hide = 1, style = "KunkkaTide" })
		return
	end

	local stack = self.parent:GetUpgradeStack("modifier_kunkka_tidebringer_custom_legendary")

	self.parent:UpdateUIlong({ stack = stack, max = self.ability.talents.w7_max, style = "KunkkaTide" })
end

function modifier_kunkka_tidebringer_custom_tracker:CheckEffect()
	if not IsServer() then
		return
	end

	if not self.effect and not self.parent:HasModifier("modifier_kunkka_tidebringer_custom_cd") then
		local particle = wearables_system:GetParticleReplacement(
			self.parent,
			"particles/units/heroes/hero_kunkka/kunkka_weapon_tidebringer.vpcf"
		)
		self.effect = ParticleManager:CreateParticle(particle, PATTACH_CUSTOMORIGIN_FOLLOW, self.parent)
		ParticleManager:SetParticleControlEnt(
			self.effect,
			0,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_tidebringer",
			self.parent:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			self.effect,
			2,
			self.parent,
			PATTACH_POINT_FOLLOW,
			"attach_sword",
			self.parent:GetAbsOrigin(),
			true
		)
		self:AddParticle(self.effect, false, false, -1, false, false)

		self.parent:EmitSound("Hero_Kunkaa.Tidebringer")
	end

	if self.effect and self.parent:HasModifier("modifier_kunkka_tidebringer_custom_cd") then
		ParticleManager:DestroyParticle(self.effect, false)
		ParticleManager:ReleaseParticleIndex(self.effect)
		self.effect = nil
	end
end

function modifier_kunkka_tidebringer_custom_tracker:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if params.no_attack_cooldown then
		return
	end
	if self.parent ~= params.attacker then
		return
	end

	self.is_attack = false
	local target = params.target
	if not target then
		return
	end

	if target.is_kunkka_target then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_kunkka_tidebringer_custom_target_attack", {})
	else
		self.parent:RemoveModifierByName("modifier_kunkka_tidebringer_custom_target_attack")
	end

	if self.parent:HasModifier("modifier_kunkka_tidebringer_custom_cd") and not target.is_kunkka_target then
		return
	end

	self.is_attack = true
end

function modifier_kunkka_tidebringer_custom_tracker:GetProcChance(params, name)
	if params.target:GetTeamNumber() == self.parent:GetTeamNumber() and not params.target.is_kunkka_target then
		return 0
	end
	if name == "hit" then
		return 100
	end
	if not params.target.is_kunkka_target then
		return 0
	end
	local mod = params.target:FindModifierByName("modifier_kunkka_tidebringer_custom_target")
	if not mod or mod.procs >= self.ability.talents.w3_procs then
		return 0
	end
	return self.ability.talents.w3_chance
end

function modifier_kunkka_tidebringer_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end
	if not self.is_attack then
		return
	end

	local target = params.target

	target:EmitSound("Hero_Kunkka.Tidebringer.Attack")
	target:GenericParticle("particles/units/heroes/hero_tidehunter/tidehunter_krakenshell_purge.vpcf")

	self.ability:ProcSlow(target)
	self.ability:ProcArmor(target)

	local cleave = self.ability.cleave_damage
	if self.ability.talents.has_w7 == 0 then
		cleave = cleave + self.ability.talents.w1_cleave
	end

	local hero_target = target:IsRealHero() and target or nil

	local damage = params.damage * cleave
	local sound = wearables_system:GetSoundReplacement(self.parent, "Hero_Kunkka.TidebringerDamage", self.ability)
	local effect = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_kunkka/kunkka_spell_tidebringer.vpcf",
		self.ability
	)
	local more_targets = target.is_kunkka_target and self.parent:FindTargets(self.ability.target_radius) or nil
	local targets = DoCleaveAttack(
		self.parent,
		target,
		self.ability,
		damage,
		self.ability.cleave_starting_width,
		self.ability.cleave_ending_width,
		self.ability.cleave_distance + (self.ability.talents.has_w4 == 1 and self.ability.talents.w4_distance or 0),
		effect,
		sound,
		more_targets
	)

	for _, cleave_target in pairs(targets) do
		if
			cleave_target:IsRealHero()
			and self.parent:GetQuest() == "Kunkka.Quest_6"
			and (cleave_target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() >= self.parent.quest.number
		then
			self.parent:UpdateQuest(1)
		end

		if not hero_target and cleave_target:IsRealHero() then
			hero_target = cleave_target
		end

		self.ability:ProcSlow(cleave_target)
		self.ability:ProcArmor(cleave_target)

		if self.ability.talents.has_w4 == 1 then
			if
				not cleave_target:IsDebuffImmune()
				and cleave_target:CheckCd("kunkka_w4_root", self.ability.talents.w4_talent_cd)
			then
				cleave_target:AddNewModifier(
					self.parent,
					self.ability,
					"modifier_kunkka_tidebringer_custom_root",
					{ duration = (1 - cleave_target:GetStatusResistance()) * self.ability.talents.w4_root }
				)
			end

			self.parent.fake_attack = true
			self.parent:PerformAttack(
				cleave_target,
				true,
				true,
				true,
				true,
				false,
				true,
				true,
				{ attack = "kunkka_w4" },
				true
			)
			self.parent.fake_attack = nil
		end

		if IsValid(self.parent.xmark_ability) then
			self.parent.xmark_ability:ApplyBleed(cleave_target, damage)
			self.parent.xmark_ability:ProcEffects(cleave_target)
		end
	end

	if
		hero_target
		and self.ability.talents.has_w7 == 1
		and not self.parent:HasModifier("modifier_kunkka_tidebringer_custom_waves")
	then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_kunkka_tidebringer_custom_legendary",
			{ duration = self.ability.talents.w7_duration }
		)
	end

	if not target.is_kunkka_target then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_kunkka_tidebringer_custom_cd",
			{ duration = self.ability.attack_cd }
		)
	end

	self.is_attack = false
end

function modifier_kunkka_tidebringer_custom_tracker:OrderFilter(params)
	if params.order_type ~= DOTA_UNIT_ORDER_MOVE_TO_TARGET then
		return
	end
	if not params.target then
		return
	end
	if params.target.kunkka_caster ~= self.parent then
		return
	end

	return { order_type = DOTA_UNIT_ORDER_ATTACK_TARGET }
end

function modifier_kunkka_tidebringer_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_kunkka_tidebringer_custom_tracker:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	if not self.parent.kunkka_w7 then
		return
	end

	return self.ability.talents.w7_damage + self.ability.talents.w1_damage_wave - 100
end

function modifier_kunkka_tidebringer_custom_tracker:GetModifierPreAttack_BonusDamage()
	local result = self.ability.talents.w1_damage

	if self.is_attack then
		result = result + self.ability.damage_bonus
	end
	return result
end

function modifier_kunkka_tidebringer_custom_tracker:GetActivityTranslationModifiers()
	if not self.is_attack then
		return
	end
	return "tidebringer"
end

modifier_kunkka_tidebringer_custom_cd = class(mod_cd)
function modifier_kunkka_tidebringer_custom_cd:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.ability.tracker:CheckEffect()
end

function modifier_kunkka_tidebringer_custom_cd:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) or not IsValid(self.ability.tracker) then
		return
	end

	self.ability.tracker:CheckEffect()
end

modifier_kunkka_tidebringer_custom_slow = class(mod_hidden)
function modifier_kunkka_tidebringer_custom_slow:IsPurgable()
	return true
end
function modifier_kunkka_tidebringer_custom_slow:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.slow = self.ability.talents.w2_slow

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_tidehunter/tidehunter_gush_slow.vpcf", self)
end

function modifier_kunkka_tidebringer_custom_slow:OnRefresh()
	self.slow = self.ability.talents.w2_slow
end

function modifier_kunkka_tidebringer_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_kunkka_tidebringer_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_kunkka_tidebringer_custom_target = class(mod_hidden)
function modifier_kunkka_tidebringer_custom_target:GetAbsoluteNoDamagePhysical()
	return 1
end
function modifier_kunkka_tidebringer_custom_target:GetAbsoluteNoDamageMagical()
	return 1
end
function modifier_kunkka_tidebringer_custom_target:GetAbsoluteNoDamagePure()
	return 1
end
function modifier_kunkka_tidebringer_custom_target:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.hits = self.ability.target_hits + (self.ability.talents.has_w7 == 1 and self.ability.talents.w7_hits or 0)
	self.procs = 0

	self.parent:AddAttackEvent_inc(self, true)
	self.parent:EmitSound("Kunkka.Tidebringer_target_spawn")
	self.parent:EmitSound("Kunkka.Tidebringer_target_spawn2")

	local effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_tidehunter/tidehunter_gush_splash_mid.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect, 3, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(effect)

	self.parent:GenericParticle("particles/units/heroes/hero_tidehunter/tidehunter_krakenshell_purge.vpcf")

	self.parent:FacePoint(self.caster:GetAbsOrigin())

	self.parent:SetBaseMaxHealth(self.hits)
	self.parent:SetMaxHealth(self.hits)
	self.parent:SetHealth(self.hits)
end

function modifier_kunkka_tidebringer_custom_target:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("Kunkka.Tidebringer_target_death")
end

function modifier_kunkka_tidebringer_custom_target:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_HEALTHBAR_PIPS,
	}
end

function modifier_kunkka_tidebringer_custom_target:GetModifierHealthBarPips()
	return self.parent:GetMaxHealth()
end

function modifier_kunkka_tidebringer_custom_target:CheckState()
	return {
		[MODIFIER_STATE_MAGIC_IMMUNE] = true,
		[MODIFIER_STATE_SPECIALLY_DENIABLE] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
		[MODIFIER_STATE_UNTARGETABLE_ENEMY] = true,
	}
end

function modifier_kunkka_tidebringer_custom_target:AttackEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.target then
		return
	end
	if self.caster ~= params.attacker then
		return
	end

	self.parent:StartGesture(ACT_DOTA_FLINCH)
	self.parent:EmitSound("Kunkka.Tidebringer_target_hit")

	if
		params.procs
		and params.procs[self.ability.tracker]
		and params.procs[self.ability.tracker].default
		and self.procs < self.ability.talents.w3_procs
	then
		self.procs = self.procs + 1
		self.parent:GenericParticle("particles/kunkka/tidebringer_refresh.vpcf")
		self.parent:EmitSound("Kunkka.Tidebringer_refresh")
		return
	end

	self.hits = self.hits - 1

	if self.hits <= 0 then
		self.parent:Kill(nil, nil)
	else
		self.parent:SetHealth(self.hits)
	end
end

modifier_kunkka_tidebringer_custom_target_attack = class(mod_hidden)
function modifier_kunkka_tidebringer_custom_target_attack:OnCreated()
	self.ability = self:GetAbility()
end

function modifier_kunkka_tidebringer_custom_target_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_kunkka_tidebringer_custom_target_attack:CheckState()
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

function modifier_kunkka_tidebringer_custom_target_attack:GetModifierAttackSpeedBonus_Constant()
	return self.ability.target_attack_speed or 0
end

modifier_kunkka_tidebringer_custom_armor = class(mod_visible)
function modifier_kunkka_tidebringer_custom_armor:GetTexture()
	return "buffs/kunkka/tidebringer_3"
end
function modifier_kunkka_tidebringer_custom_armor:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()

	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_kunkka_tidebringer_custom_armor:OnRefresh()
	self.armor = self.ability.talents.w3_armor
	self.max = self.ability.talents.w3_max

	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end

	self:IncrementStackCount()
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:EmitSound("Hero_Kunkka.Tidebringer.MaxArmor")
	self.parent:GenericParticle("particles/morphling/wave_health_reducea.vpcf", self, true)
end

function modifier_kunkka_tidebringer_custom_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_kunkka_tidebringer_custom_armor:GetModifierPhysicalArmorBonus()
	return self.armor * self:GetStackCount()
end

modifier_kunkka_tidebringer_custom_root = class(mod_hidden)
function modifier_kunkka_tidebringer_custom_root:IsPurgable()
	return true
end
function modifier_kunkka_tidebringer_custom_root:OnCreated()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.parent:EmitSound("Kunkka.Tidebringer_root_target")

	self.particle = ParticleManager:CreateParticle(
		"particles/kunkka/tidebringer_root_start.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.particle, 2, Vector(250, 0, 0))
	ParticleManager:SetParticleControl(self.particle, 3, self.parent:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(self.particle)

	local effect = ParticleManager:CreateParticle(
		"particles/kunkka/tidebringer_root.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect, 0, self.parent:GetAbsOrigin() + Vector(0, 0, 75))
	ParticleManager:SetParticleControl(effect, 1, self.parent:GetAbsOrigin() + Vector(0, 0, 75))
	self:AddParticle(effect, false, false, -1, false, false)

	self.parent:GenericParticle(
		"particles/econ/items/oracle/oracle_fortune_ti7/oracle_fortune_ti7_purge_root_pnt.vpcf",
		self
	)
end

function modifier_kunkka_tidebringer_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

function modifier_kunkka_tidebringer_custom_root:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_kunkka_tidebringer_custom_root:GetModifierDisableTurning()
	if self.parent:IsDebuffImmune() then
		return
	end
	return 1
end

modifier_kunkka_tidebringer_custom_legendary = class(mod_hidden)
function modifier_kunkka_tidebringer_custom_legendary:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true
	self:OnRefresh()
end

function modifier_kunkka_tidebringer_custom_legendary:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() < self.ability.talents.w7_max then
		self:IncrementStackCount()
	end

	self.ability.tracker:UpdateUI()

	if self:GetStackCount() < self.ability.talents.w7_max then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_kunkka_tidebringer_custom_waves",
		{ duration = self.ability.talents.w7_wave_duration }
	)
end

function modifier_kunkka_tidebringer_custom_legendary:OnDestroy()
	if not IsServer() then
		return
	end
	if not IsValid(self.ability) or not IsValid(self.ability.tracker) then
		return
	end

	self.ability.tracker:UpdateUI()
end

modifier_kunkka_tidebringer_custom_waves = class(mod_hidden)
function modifier_kunkka_tidebringer_custom_waves:GetStatusEffectName()
	return "particles/status_fx/status_effect_slardar_amp_damage.vpcf"
end
function modifier_kunkka_tidebringer_custom_waves:StatusEffectPriority()
	return MODIFIER_PRIORITY_HIGH
end
function modifier_kunkka_tidebringer_custom_waves:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.RemoveForDuel = true

	self.parent:RemoveModifierByName("modifier_kunkka_tidebringer_custom_legendary")
	self:SetStackCount(self.ability.talents.w7_waves)

	local wave = self.parent.tidebringer_legendary_ability
	if IsValid(wave) and wave:IsHidden() then
		self.parent:SwapAbilities("kunkka_tidebringer_custom", "kunkka_tidal_wave_custom", false, true)
	end

	local effect2 = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_siren/naga_siren_riptide.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(effect2, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(effect2, 1, Vector(225, 225, 225))
	ParticleManager:ReleaseParticleIndex(effect2)

	self.parent:EmitSound("Kunkka.Tidebringer_legendary_ready")
	self.parent:GenericParticle("particles/kunkka/tidehunter_legendary_ready.vpcf", self, true)
	self.parent:GenericParticle("particles/kunkka/tidebringer_legendary_buff_2.vpcf", self)

	self.effect = ParticleManager:CreateParticle(
		"particles/kunkka/tidebringer_legendary_buff.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControl(self.effect, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControlEnt(
		self.effect,
		1,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.effect, false, false, -1, false, false)

	self.ability.tracker:UpdateUI()

	self:OnIntervalThink()
	self:StartIntervalThink(0.1)
end

function modifier_kunkka_tidebringer_custom_waves:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.parent:UpdateUIshort({
		time = self:GetRemainingTime(),
		max_time = self.ability.talents.w7_wave_duration,
		stack = self:GetStackCount(),
		active = 1,
		style = "KunkkaWave",
		priority = 2,
	})
end

function modifier_kunkka_tidebringer_custom_waves:UseWave()
	if not IsServer() then
		return
	end

	self:DecrementStackCount()
	if self:GetStackCount() > 0 then
		return
	end

	self:Destroy()
end

function modifier_kunkka_tidebringer_custom_waves:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
	}
end

function modifier_kunkka_tidebringer_custom_waves:GetModifierModelScale()
	return 10
end

function modifier_kunkka_tidebringer_custom_waves:OnDestroy()
	if not IsServer() then
		return
	end

	local tidebringer = self.parent.tidebringer_ability
	if IsValid(tidebringer) and tidebringer:IsHidden() then
		self.parent:SwapAbilities("kunkka_tidal_wave_custom", "kunkka_tidebringer_custom", false, true)
	end

	self.parent:UpdateUIshort({ hide = 1, hide_full = 1, style = "KunkkaWave", priority = 2 })

	if not IsValid(self.ability) or not IsValid(self.ability.tracker) then
		return
	end
	self.ability.tracker:UpdateUI()
end

modifier_kunkka_tidebringer_custom_wave_armor = class(mod_hidden)
function modifier_kunkka_tidebringer_custom_wave_armor:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self.caster.tidebringer_legendary_ability

	if not IsValid(self.ability) then
		self:Destroy()
		return
	end

	self.armor = self.parent:GetArmor(self) * self.ability.talents.w7_armor
end

function modifier_kunkka_tidebringer_custom_wave_armor:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_kunkka_tidebringer_custom_wave_armor:GetModifierPhysicalArmorBonus()
	if not IsServer() then
		return
	end
	return self.armor
end

kunkka_tidal_wave_custom = class({})
kunkka_tidal_wave_custom.talents = {}

function kunkka_tidal_wave_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w2_cd_legendary = 0,

			w7_talent_cd = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "talent_cd", true),
			w7_armor = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "armor", true) / 100,
			w7_width = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "width", true),
			w7_speed = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "speed", true),
			w7_distance = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "distance", true),
			w7_spawn_distance = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "spawn_distance", true),
			w7_stun = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "stun", true),
			w7_knockback = caster:GetTalentValue("modifier_kunkka_tidebringer_7", "knockback", true),
		}
	end

	if caster:HasTalent("modifier_kunkka_tidebringer_2") then
		self.talents.w2_cd_legendary = caster:GetTalentValue("modifier_kunkka_tidebringer_2", "cd_legendary") / 100
	end
end

function kunkka_tidal_wave_custom:GetCooldown(iLevel)
	return (self.talents.w7_talent_cd or 0) * (1 + (self.talents.w2_cd_legendary or 0))
end

function kunkka_tidal_wave_custom:GetCastRange(vLocation, hTarget)
	return self.talents.w7_distance or 0
end

function kunkka_tidal_wave_custom:OnSpellStart()
	local point = self.caster:CastPosition(self:GetCursorPosition())

	local direction = point - self.caster:GetAbsOrigin()
	direction.z = 0
	direction = direction:Normalized()

	local origin = self.caster:GetAbsOrigin() - direction * self.talents.w7_spawn_distance

	self.caster:EmitSound("Hero_Kunkka.TidalWave_2")
	self.caster:EmitSound("Hero_Kunkka.TidalWave")

	ProjectileManager:CreateLinearProjectile({
		Source = self.caster,
		Ability = self,
		vSpawnOrigin = origin,
		bDeleteOnHit = false,
		iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
		iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		EffectName = "particles/units/heroes/hero_kunkka/kunkka_shard_tidal_wave.vpcf",
		fDistance = self.talents.w7_distance + self.talents.w7_spawn_distance,
		fStartRadius = self.talents.w7_width / 2,
		fEndRadius = self.talents.w7_width / 2,
		vVelocity = direction * self.talents.w7_speed,
		bHasFrontalCone = false,
		bReplaceExisting = false,
		bProvidesVision = true,
		iVisionRadius = self.talents.w7_width,
		fVisionDuration = 2,
		iVisionTeamNumber = self.caster:GetTeamNumber(),
		ExtraData = {
			direction_x = direction.x,
			direction_y = direction.y,
		},
	})

	local mod = self.caster:FindModifierByName("modifier_kunkka_tidebringer_custom_waves")
	if mod then
		mod:UseWave()
	end
end

function kunkka_tidal_wave_custom:OnProjectileHit_ExtraData(target, location, data)
	if not IsServer() then
		return
	end
	if not target then
		return
	end
	if not target:IsUnit() then
		return
	end

	local bkb_ability = self.caster:BkbAbility(self, true)

	target:EmitSound("Hero_Kunkka.TidebringerDamage")
	target:EmitSound("Hero_Kunkka.TidalWave_target")

	target:AddNewModifier(self.caster, bkb_ability, "modifier_generic_knockback", {
		duration = self.talents.w7_stun,
		distance = self.talents.w7_knockback,
		height = 0,
		direction_x = data.direction_x,
		direction_y = data.direction_y,
		IsStun = 1,
		IsFlail = 0,
	})

	if not target:IsCreep() then
		target:AddNewModifier(self.caster, bkb_ability, "modifier_kunkka_tidebringer_custom_wave_armor", {})
	end

	if IsValid(self.caster.tidebringer_ability) then
		self.caster.tidebringer_ability:ProcSlow(target)
	end

	local effect =
		ParticleManager:CreateParticle("particles/kunkka/xmark_proc.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	self.caster.kunkka_w7 = true
	self.caster:PerformAttack(target, true, true, true, true, false, false, true, { damage = "kunkka_w7" }, true)
	self.caster.kunkka_w7 = nil

	target:RemoveModifierByName("modifier_kunkka_tidebringer_custom_wave_armor")
end