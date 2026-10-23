--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_slow",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_unit",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_unit_aura",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_legendary_saved",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_legendary_pick",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_legendary_autocast",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_legendary_cd",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_tracker",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_terrorblade_reflection_stun_delay",
	"abilities/terrorblade/custom_terrorblade_reflection",
	LUA_MODIFIER_MOTION_NONE
)

custom_terrorblade_reflection = class({})
custom_terrorblade_reflection.talents = {}
custom_terrorblade_reflection.targets_ids = {}

function custom_terrorblade_reflection:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_weapon_blur.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_weapon_blur_both.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/units/heroes/hero_terrorblade/terrorblade_weapon_blur_reverse.vpcf",
		context
	)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_mirror_image.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_cast.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_terrorblade_reflection.vpcf", context)
	PrecacheResource(
		"particle",
		"particles/econ/items/silencer/silencer_ti10_immortal_shield/silencer_ti10_immortal_curse_aoe.vpcf",
		context
	)
	PrecacheResource("particle", "particles/huskar/huskar_timer.vpcf", context)

	dota1x6:PrecacheShopItems("npc_dota_hero_terrorblade", context)
end

function custom_terrorblade_reflection:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q1_cd = 0,
			q1_duration = 0,

			q2_damage = 0,
			q2_armor = 0,

			q3_damage_reduce = 0,
			q3_slow = 0,

			has_q4 = 0,
			q4_speed = 0,
			q4_damage = 0,
			q4_duration = caster:GetTalentValue("modifier_terror_reflection_4", "duration", true),
			q4_max = caster:GetTalentValue("modifier_terror_reflection_4", "max", true),

			has_q5 = 0,
			q5_cast = caster:GetTalentValue("modifier_terror_reflection_5", "cast", true) / 100,
			q5_delay = caster:GetTalentValue("modifier_terror_reflection_5", "delay", true),
			q5_range = caster:GetTalentValue("modifier_terror_reflection_5", "range", true),
			q5_stun = caster:GetTalentValue("modifier_terror_reflection_5", "stun", true),

			has_q6 = 0,
			q6_heal = caster:GetTalentValue("modifier_terror_reflection_6", "heal", true) / 100,
			q6_max = caster:GetTalentValue("modifier_terror_reflection_6", "max", true),
			q6_cd_items = caster:GetTalentValue("modifier_terror_reflection_6", "cd_items", true),
			q6_cdr = caster:GetTalentValue("modifier_terror_reflection_6", "cdr", true),

			has_q7 = 0,
			q7_damage = caster:GetTalentValue("modifier_terror_reflection_7", "damage", true),
		}
	end

	if caster:HasTalent("modifier_terror_reflection_1") then
		self.talents.q1_cd = caster:GetTalentValue("modifier_terror_reflection_1", "cd")
		self.talents.q1_duration = caster:GetTalentValue("modifier_terror_reflection_1", "duration")
	end

	if caster:HasTalent("modifier_terror_reflection_2") then
		self.talents.q2_damage = caster:GetTalentValue("modifier_terror_reflection_2", "damage")
		self.talents.q2_armor = caster:GetTalentValue("modifier_terror_reflection_2", "armor")
	end

	if caster:HasTalent("modifier_terror_reflection_3") then
		self.talents.q3_damage_reduce = caster:GetTalentValue("modifier_terror_reflection_3", "damage_reduce")
		self.talents.q3_slow = caster:GetTalentValue("modifier_terror_reflection_3", "slow")
	end

	if caster:HasTalent("modifier_terror_reflection_4") then
		self.talents.has_q4 = 1
		self.talents.q4_speed = caster:GetTalentValue("modifier_terror_reflection_4", "speed")
		self.talents.q4_damage = caster:GetTalentValue("modifier_terror_reflection_4", "damage")
		caster:AddAttackEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_terror_reflection_5") then
		self.talents.has_q5 = 1
	end

	if caster:HasTalent("modifier_terror_reflection_6") then
		self.talents.has_q6 = 1
		caster:AddAttackEvent_out(self.tracker, true)
	end

	if caster:HasTalent("modifier_terror_reflection_7") then
		self.talents.has_q7 = 1
		caster:AddSpellEvent(self.tracker, true)
		caster:AddSpellStartEvent(self.tracker, true)
	end
end

function custom_terrorblade_reflection:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "terrorblade_reflection", self)
end

function custom_terrorblade_reflection:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_terrorblade_reflection_tracker"
end

function custom_terrorblade_reflection:GetCastPoint(iLevel)
	return self.BaseClass.GetCastPoint(self) * (1 + (self.talents.has_q5 == 1 and self.talents.q5_cast or 0))
end

function custom_terrorblade_reflection:GetCastRange(vLocation, hTarget)
	return self.BaseClass.GetCastRange(self, vLocation, hTarget)
		+ (self.talents.has_q5 == 1 and self.talents.q5_range or 0)
end

function custom_terrorblade_reflection:GetManaCost(level)
	return self.BaseClass.GetManaCost(self, level)
end

function custom_terrorblade_reflection:GetCooldown(iLevel)
	return self.BaseClass.GetCooldown(self, iLevel) + (self.talents.q1_cd or 0)
end

function custom_terrorblade_reflection:GetBehavior()
	if self.talents.has_q7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE + DOTA_ABILITY_BEHAVIOR_AUTOCAST
	end
	return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
end

function custom_terrorblade_reflection:GetAOERadius()
	return self.range or 0
end

function custom_terrorblade_reflection:OnAbilityPhaseStart()
	self.effect = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_terrorblade/terrorblade_reflection_cast.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.caster
	)
	ParticleManager:SetParticleControlEnt(
		self.effect,
		0,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack1",
		self.caster:GetOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		self.effect,
		1,
		self.caster,
		PATTACH_POINT_FOLLOW,
		"attach_attack2",
		self.caster:GetOrigin(),
		true
	)

	if self.caster.current_model == "models/heroes/terrorblade/terrorblade_arcana.vmdl" then
		local color = self.caster:GetTerrorbladeColor()
		ParticleManager:SetParticleControl(self.effect, 15, color)
		ParticleManager:SetParticleControl(self.effect, 16, Vector(1, 0, 0))
	end

	ParticleManager:ReleaseParticleIndex(self.effect)
end

function custom_terrorblade_reflection:OnSpellStart()
	local radius = self.range
	local point = self:GetCursorPosition()

	local heroes = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		point,
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS + DOTA_UNIT_TARGET_FLAG_NO_INVIS,
		FIND_CLOSEST,
		false
	)
	local creeps = FindUnitsInRadius(
		self.caster:GetTeamNumber(),
		point,
		nil,
		radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS + DOTA_UNIT_TARGET_FLAG_NO_INVIS,
		FIND_CLOSEST,
		false
	)

	local target = nil

	if #heroes > 0 then
		target = heroes[1]
	elseif #creeps > 0 then
		target = creeps[1]
	end

	if not target then
		return
	end

	self:LaunchIllusion(target, 0)
end

function custom_terrorblade_reflection:CheckToggle()
	if self.caster:HasModifier("modifier_custom_terrorblade_reflection_legendary_cd") then
		CustomGameEventManager:Send_ServerToPlayer(
			PlayerResource:GetPlayer(self.caster:GetId()),
			"CreateIngameErrorMessage",
			{ message = "#midteleport_cd" }
		)
		return false
	end
	return true
end

function custom_terrorblade_reflection:LaunchIllusion(enemy, double)
	local duration = self.illusion_duration + self.talents.q1_duration
	local damage = self.illusion_outgoing_damage + self.talents.q2_damage
	local spawn_range = 108

	if not self.caster:HasShard() then
		duration = duration * (1 - enemy:GetStatusResistance())
	end

	if double == 1 then
		damage = self.talents.q4_damage - 100
		duration = self.talents.q4_duration
	end

	enemy:EmitSound("Hero_Terrorblade.Reflection")

	local copy_unit = enemy
	if enemy:IsCreep() or enemy:IsCreepHero() then
		copy_unit = self.caster
	end

	local mod = self.caster:FindModifierByName("modifier_custom_terrorblade_reflection_legendary_saved")
	if mod and mod.index then
		local unit = EntIndexToHScript(mod.index)
		if unit and not unit:IsNull() then
			copy_unit = unit
		end
	end

	local illusions = CreateIllusions(self.caster, copy_unit, {
		outgoing_damage = damage,
		bounty_base = 0,
		bounty_growth = nil,
		duration = duration,
	}, 1, spawn_range, false, true, true)

	local effect =
		ParticleManager:CreateParticle("particles/generic/illusion_created.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, enemy)
	ParticleManager:SetParticleControlEnt(
		effect,
		0,
		enemy,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		enemy:GetOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(effect)

	local new_illusion = nil

	for _, illusion in pairs(illusions) do
		new_illusion = illusion

		local abs = enemy:GetAbsOrigin() + RandomVector(spawn_range)
		illusion:SetAbsOrigin(abs)
		FindClearSpaceForUnit(illusion, abs, false)

		for _, mod in pairs(copy_unit:FindAllModifiers()) do
			if mod.StackOnIllusion ~= nil and mod.StackOnIllusion == true then
				illusion:UpgradeIllusion(mod:GetName(), mod:GetStackCount(), mod)
			end
		end

		illusion:SetHealth(illusion:GetMaxHealth())
		illusion:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_terrorblade_reflection_unit",
			{ double = double, duration = duration + 0.1, enemy_entindex = enemy:entindex() }
		)
		illusion:AddAbility("terrorblade_innate_custom")

		illusion.owner = self.caster
		illusion.is_reflection = true
	end

	enemy:AddNewModifier(self.caster, nil, "modifier_terrorblade_arcana_kill_effect", {})

	if double == 1 then
		return
	end

	if self.caster:HasShard() then
		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_generic_leash",
			{ duration = (1 - enemy:GetStatusResistance()) * self.shard_leash, no_dispel = 1 }
		)
	end

	if self.talents.has_q5 == 1 then
		enemy:AddNewModifier(
			self.caster,
			self,
			"modifier_custom_terrorblade_reflection_stun_delay",
			{ duration = self.talents.q5_delay, illusion = new_illusion:entindex() }
		)
	end

	enemy:AddNewModifier(
		self.caster,
		self,
		"modifier_custom_terrorblade_reflection_slow",
		{ duration = duration, illusion = new_illusion:entindex() }
	)
end

modifier_custom_terrorblade_reflection_unit = class(mod_visible)
function modifier_custom_terrorblade_reflection_unit:GetStatusEffectName()
	return "particles/status_fx/status_effect_terrorblade_reflection.vpcf"
end
function modifier_custom_terrorblade_reflection_unit:StatusEffectPriority()
	return MODIFIER_PRIORITY_ILLUSION
end
function modifier_custom_terrorblade_reflection_unit:IsAura()
	return self.ability.talents.has_q4 == 1
end
function modifier_custom_terrorblade_reflection_unit:GetAuraDuration()
	return 0.1
end
function modifier_custom_terrorblade_reflection_unit:GetAuraRadius()
	return 2000
end
function modifier_custom_terrorblade_reflection_unit:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_FRIENDLY
end
function modifier_custom_terrorblade_reflection_unit:GetAuraSearchType()
	return DOTA_UNIT_TARGET_HERO
end
function modifier_custom_terrorblade_reflection_unit:GetAuraSearchFlags()
	return DOTA_UNIT_TARGET_FLAG_INVULNERABLE
end
function modifier_custom_terrorblade_reflection_unit:GetModifierAura()
	return "modifier_custom_terrorblade_reflection_unit_aura"
end
function modifier_custom_terrorblade_reflection_unit:OnCreated(params)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.attack_count = 0
	self.attack_max = self.ability.talents.q6_max

	self.move_speed = 550

	self.self_illusion = self.parent:GetUnitName() == self.caster:GetUnitName()

	if not IsServer() then
		return
	end

	self.double = params.double
	self.max_timer = self:GetRemainingTime()

	if self.double == 0 then
		if self.ability.talents.has_q7 == 1 and not self.self_illusion then
			self.mod = self.caster:FindModifierByName("modifier_custom_terrorblade_reflection_tracker")
			if self.mod then
				self.mod:StealSpell(self.parent)
			end
		end
		self.ability.current_illusion = self.parent
		self.ability:EndCd()
	end

	self.parent:GenericParticle("particles/units/heroes/hero_terrorblade/terrorblade_mirror_image.vpcf", self)

	self.target = EntIndexToHScript(params.enemy_entindex)

	self:StartIntervalThink(0.2)
end

function modifier_custom_terrorblade_reflection_unit:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.ability.talents.has_q7 == 1 and not self.self_illusion and self.double == 0 then
		local spell_name = nil
		if IsValid(self.mod) and IsValid(self.mod.current_spell) then
			spell_name = self.mod.current_spell:GetName()
		end

		self.caster:UpdateUIshort({
			max_time = self.max_timer,
			time = self:GetRemainingTime(),
			stack = self:GetRemainingTime(),
			override_ability = spell_name,
			use_zero = 1,
			style = "TbReflection",
		})
	end

	local target = nil

	if self.target and not self.target:IsNull() and self.target:IsAlive() then
		target = self.target
	else
		target = self.parent:FindTargets(1000)[1]
	end

	if not target then
		self:Destroy()
		return
	end

	self.target = target
	self.parent:SetForceAttackTarget(target)
	self.parent:MoveToTargetToAttack(target)
end

function modifier_custom_terrorblade_reflection_unit:OnDestroy()
	if not IsServer() then
		return
	end

	if self.double == 0 then
		self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "TbReflection" })

		if self.mod and not self.mod:IsNull() then
			self.mod:ClearSpell()
		end
		self.ability.current_illusion = nil
		self.ability:StartCd()
	end

	self.parent:GenericParticle("particles/generic_gameplay/illusion_killed.vpcf")
	self.parent:ForceKill(false)
end

function modifier_custom_terrorblade_reflection_unit:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MODEL_SCALE,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
	}
end

function modifier_custom_terrorblade_reflection_unit:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_UNTARGETABLE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
		[MODIFIER_STATE_FLYING_FOR_PATHING_PURPOSES_ONLY] = true,
	}
end

function modifier_custom_terrorblade_reflection_unit:GetModifierModelScale()
	if self.self_illusion then
		return 15
	end
	return 30
end

function modifier_custom_terrorblade_reflection_unit:GetModifierMoveSpeed_Absolute()
	return self.move_speed
end

modifier_custom_terrorblade_reflection_unit_aura = class(mod_visible)
function modifier_custom_terrorblade_reflection_unit_aura:OnCreated()
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not self.caster then
		return
	end

	self.speed = self.ability.talents.q4_speed
end

function modifier_custom_terrorblade_reflection_unit_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_custom_terrorblade_reflection_unit_aura:GetModifierAttackSpeedBonus_Constant()
	return self.speed
end

modifier_custom_terrorblade_reflection_slow = class(mod_visible)
function modifier_custom_terrorblade_reflection_slow:IsPurgable()
	return not (IsValid(self.caster) and self.caster:HasShard())
end
function modifier_custom_terrorblade_reflection_slow:GetEffectName()
	return "particles/units/heroes/hero_terrorblade/terrorblade_reflection_slow.vpcf"
end
function modifier_custom_terrorblade_reflection_slow:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.move_slow = self.ability.move_slow * -1 + self.ability.talents.q3_slow
	self.attack_slow = self.ability.attack_slow * -1

	self.attack_count = 0
	self.attack_max = self.ability.talents.q4_max

	self.armor = self.ability.talents.q2_armor
	self.damage_reduce = self.ability.talents.q3_damage_reduce

	if not IsServer() then
		return
	end

	self.illusion = nil
	if table.illusion then
		self.illusion = EntIndexToHScript(table.illusion)
	end

	self.interval = 0.1

	self:StartIntervalThink(self.interval)
end

function modifier_custom_terrorblade_reflection_slow:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.illusion then
		return
	end
	if self.illusion:IsNull() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	self.illusion:RemoveModifierByName("modifier_custom_terrorblade_reflection_unit")
end

function modifier_custom_terrorblade_reflection_slow:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 10, self.interval * 2, false)
end

function modifier_custom_terrorblade_reflection_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_custom_terrorblade_reflection_slow:GetModifierAttackSpeedBonus_Constant()
	return self.attack_slow
end

function modifier_custom_terrorblade_reflection_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.move_slow
end

function modifier_custom_terrorblade_reflection_slow:GetModifierPhysicalArmorBonus()
	return self.armor
end

function modifier_custom_terrorblade_reflection_slow:GetModifierDamageOutgoing_Percentage()
	return self.damage_reduce
end

function modifier_custom_terrorblade_reflection_slow:GetModifierSpellAmplify_Percentage()
	return self.damage_reduce
end

modifier_custom_terrorblade_reflection_legendary_saved = class(mod_visible)
function modifier_custom_terrorblade_reflection_legendary_saved:RemoveOnDeath()
	return false
end
function modifier_custom_terrorblade_reflection_legendary_saved:GetTexture()
	return self.name
end
function modifier_custom_terrorblade_reflection_legendary_saved:OnCreated(table)
	if not IsServer() then
		return
	end
	self.index = table.index

	self.unit = EntIndexToHScript(self.index)

	if not self.unit then
		self:Destroy()
		return
	end

	self.name = self.unit:GetUnitName()
	self:SetHasCustomTransmitterData(true)
end

function modifier_custom_terrorblade_reflection_legendary_saved:AddCustomTransmitterData()
	return {
		name = self.name,
	}
end

function modifier_custom_terrorblade_reflection_legendary_saved:HandleCustomTransmitterData(data)
	self.name = data.name
end

modifier_custom_terrorblade_reflection_legendary_pick = class(mod_hidden)
function modifier_custom_terrorblade_reflection_legendary_pick:OnCreated(table)
	if not IsServer() then
		return
	end

	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.targets = {}

	for id, index in pairs(self.ability.targets_ids) do
		local target = EntIndexToHScript(index)
		if target and not target:IsNull() and target:GetTeamNumber() ~= self.parent:GetTeamNumber() then
			local count = #self.targets + 1
			self.targets[count] = {}
			self.targets[count].target = target:GetUnitName()
			self.targets[count].index = index
		end
	end

	if #self.targets == 0 then
		self:Destroy()
		return
	end

	EmitAnnouncerSoundForPlayer("TB.Reflection_pick_start", self.parent:GetPlayerOwnerID())

	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_custom_terrorblade_reflection_legendary_pick:OnIntervalThink()
	if not IsServer() then
		return
	end
	local targets = {}

	for i, data in pairs(self.targets) do
		targets[i] = { hero = data.target }
	end

	self.parent:UpdateUIpick({ mod = self, text = "#pa_pick_hero", targets = targets })
end

function modifier_custom_terrorblade_reflection_legendary_pick:EndPick(pick)
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end

	if self.targets[pick] and self.targets[pick].index then
		self.parent:RemoveModifierByName("modifier_custom_terrorblade_reflection_legendary_saved")
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_terrorblade_reflection_legendary_saved",
			{ index = self.targets[pick].index }
		)
	end

	self:Destroy()
end

function modifier_custom_terrorblade_reflection_legendary_pick:OnDestroy()
	if not IsServer() then
		return
	end

	EmitAnnouncerSoundForPlayer("Lc.Duel_target_end", self.parent:GetPlayerOwnerID())
	self.parent:UpdateUIpick({ hide = 1 })
end

modifier_custom_terrorblade_reflection_tracker = class(mod_hidden)
function modifier_custom_terrorblade_reflection_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.illusion_duration = self.ability:GetSpecialValueFor("illusion_duration")
	self.ability.illusion_outgoing_damage = self.ability:GetSpecialValueFor("illusion_outgoing_damage")
	self.ability.move_slow = self.ability:GetSpecialValueFor("move_slow")
	self.ability.range = self.ability:GetSpecialValueFor("range")
	self.ability.attack_slow = self.ability:GetSpecialValueFor("attack_slow")
	self.ability.shard_leash = self.ability:GetSpecialValueFor("shard_leash")

	if not IsServer() then
		return
	end

	for id, player in pairs(players) do
		local team = player:GetTeamNumber()
		if team ~= self.parent:GetTeamNumber() then
			self.ability.targets_ids[id] = player:entindex()
		end
	end

	self.spells = {
		["invoker_cold_snap_custom"] = true,
		["troll_warlord_whirling_axes_ranged_custom"] = true,
	}

	self.current_spell = nil
	self.hidden_spell = nil
	self.interval = 1
	self.timer = 0

	self:SetHasCustomTransmitterData(true)
	self:StartIntervalThink(self.interval)
end

function modifier_custom_terrorblade_reflection_tracker:OnRefresh()
	self.ability.illusion_outgoing_damage = self.ability:GetSpecialValueFor("illusion_outgoing_damage")
	self.ability.move_slow = self.ability:GetSpecialValueFor("move_slow")
	self.ability.attack_slow = self.ability:GetSpecialValueFor("attack_slow")
end

function modifier_custom_terrorblade_reflection_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MANACOST_PERCENTAGE_STACKING,
	}
end

function modifier_custom_terrorblade_reflection_tracker:GetModifierSpellAmplify_Percentage(params)
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if params.inflictor == nil then
		return
	end

	local spell = self.current_spell
	if not spell then
		spell = self.hidden_spell
	end

	if not spell or spell ~= params.inflictor then
		return
	end
	return self.ability.talents.q7_damage
end

function modifier_custom_terrorblade_reflection_tracker:GetModifierPercentageManacostStacking(params)
	if self.ability.talents.has_q7 == 0 then
		return
	end
	if params.ability == nil then
		return
	end
	if not self.current_spell or self.current_spell ~= params.ability then
		return
	end
	return 100
end

function modifier_custom_terrorblade_reflection_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_q6 == 0 then
		return
	end
	return self.ability.talents.q6_cdr
end

function modifier_custom_terrorblade_reflection_tracker:ForceDelete(spell)
	if not IsServer() then
		return
	end
	if self:CheckMods(spell) <= 0 then
		return
	end

	local units = FindUnitsInRadius(
		DOTA_TEAM_NOTEAM,
		Vector(0, 0, 0),
		nil,
		FIND_UNITS_EVERYWHERE,
		DOTA_UNIT_TARGET_TEAM_BOTH,
		DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD,
		FIND_ANY_ORDER,
		false
	)
	for _, unit in pairs(units) do
		for _, mod in pairs(unit:FindAllModifiers()) do
			if mod:GetAbility() and mod:GetAbility() == spell then
				mod:Destroy()
			end
		end
	end
end

function modifier_custom_terrorblade_reflection_tracker:OnIntervalThink()
	if not IsServer() then
		return
	end

	if
		not self.ability:IsActivated() and (not self.ability.current_illusion or self.ability.current_illusion:IsNull())
	then
		self.ability:StartCd()
	end

	if self.ability.talents.has_q7 == 0 then
		return
	end
	if not self.hidden_spell then
		return
	end

	self.timer = self.timer + self.interval
	if self.timer < 10 and self:CheckMods(self.hidden_spell) > 0 then
		return
	end

	if self.timer >= 10 then
		self:ForceDelete(self.hidden_spell)
	end

	self.parent:RemoveAbility(self.hidden_spell:GetName())
	self.hidden_spell = nil
	self.timer = 0
end

function modifier_custom_terrorblade_reflection_tracker:StealSpell(target)
	if self.hidden_spell then
		self:ForceDelete(self.hidden_spell)
		self.parent:RemoveAbility(self.hidden_spell:GetName())
		self.hidden_spell = nil
		self.timer = 0
	end

	self:ClearSpell()

	local new_ability = nil

	local current_ability = target:GetAbilityByIndex(0)

	for name, _ in pairs(self.spells) do
		if target:HasAbility(name) then
			new_ability = name
			break
		end
	end

	if not new_ability then
		if current_ability then
			new_ability = current_ability:GetName()
		else
			return
		end
	end

	if self.ability:IsHidden() then
		return
	end

	self.current_spell = self.parent:AddAbility(new_ability)
	if self.current_spell then
		local level = self.current_spell:GetMaxLevel()
		local target_ability = target:FindAbilityByName(new_ability)
		if target_ability and target_ability:GetAbilityType() == 1 then
			level = target_ability:GetLevel()
		end

		self.current_spell:SetRefCountsModifiers(true)
		self.current_spell:SetStolen(true)
		self.current_spell:SetLevel(level)
		self.current_spell:EndCd(0)
		self.current_spell:StartCooldown(0.2)

		if bit.band(self.current_spell:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_AUTOCAST) ~= 0 then
			self.current_spell:ToggleAutoCast()
		end
	end

	self.parent:SwapAbilities(self.ability:GetName(), self.current_spell:GetName(), false, true)
	self:SendBuffRefreshToClients()

	return self.current_spell:GetName()
end

function modifier_custom_terrorblade_reflection_tracker:ClearSpell()
	if not self.current_spell then
		return
	end

	self.parent:SwapAbilities(self.ability:GetName(), self.current_spell:GetName(), true, false)

	if
		self.current_spell:GetIntrinsicModifierName() ~= nil
		and self.parent:FindModifierByName(self.current_spell:GetIntrinsicModifierName())
	then
		self.parent:RemoveModifierByName(self.current_spell:GetIntrinsicModifierName())
	end

	if
		bit.band(self.current_spell:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_TOGGLE) ~= 0
		and self.current_spell:GetToggleState()
	then
		self.current_spell:ToggleAbility()
	end

	if self:CheckMods(self.current_spell) <= 0 then
		self.parent:RemoveAbility(self.current_spell:GetName())
	else
		self.hidden_spell = self.current_spell
	end

	self.current_spell = nil
end

function modifier_custom_terrorblade_reflection_tracker:CheckMods(ability)
	if not IsServer() then
		return
	end
	local count = 0

	if
		ability:GetIntrinsicModifierName() ~= nil and self.parent:FindModifierByName(ability:GetIntrinsicModifierName())
	then
		count = -1
	end
	count = count + ability:NumModifiersUsingAbility()
	return count
end

function modifier_custom_terrorblade_reflection_tracker:AddCustomTransmitterData()
	if not self.current_spell then
		return
	end
	return {
		current_spell = self.current_spell:entindex(),
	}
end

function modifier_custom_terrorblade_reflection_tracker:HandleCustomTransmitterData(data)
	if not data.current_spell then
		return
	end
	self.current_spell = EntIndexToHScript(data.current_spell)
end

function modifier_custom_terrorblade_reflection_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if params.ability:IsItem() then
		return
	end
	if not self.current_spell or self.current_spell ~= params.ability then
		return
	end
	if bit.band(self.current_spell:GetBehaviorInt(), DOTA_ABILITY_BEHAVIOR_IMMEDIATE) == 0 then
		return
	end

	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_2)
end

function modifier_custom_terrorblade_reflection_tracker:SpellStartEvent(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.unit then
		return
	end
	if not self.current_spell or self.current_spell ~= params.ability then
		return
	end
	self.parent:StartGesture(ACT_DOTA_CAST_ABILITY_2)
end

function modifier_custom_terrorblade_reflection_tracker:AttackEvent_out(params)
	if not IsServer() then
		return
	end
	if not params.target:IsUnit() then
		return
	end
	if params.attacker:GetTeamNumber() ~= self.parent:GetTeamNumber() then
		return
	end

	if self.ability.talents.has_q4 == 1 and self.parent == params.attacker then
		local slow_mod = params.target:FindModifierByName("modifier_custom_terrorblade_reflection_slow")
		if slow_mod and slow_mod.attack_max and slow_mod.attack_count < slow_mod.attack_max then
			slow_mod.attack_count = slow_mod.attack_count + 1
			if slow_mod.attack_count >= slow_mod.attack_max then
				self.ability:LaunchIllusion(params.target, 1)
			end
		end
	end

	if self.ability.talents.has_q6 == 0 then
		return
	end

	local mod = params.attacker:FindModifierByName("modifier_custom_terrorblade_reflection_unit")

	if not mod then
		return
	end
	if not params.attacker.owner or params.attacker.owner ~= self.parent then
		return
	end
	if not mod.double or mod.double == 1 or not mod.attack_max then
		return
	end
	if mod.attack_count >= mod.attack_max then
		return
	end

	mod.attack_count = mod.attack_count + 1

	self.parent:CdItems(self.ability.talents.q6_cd_items, "modifier_terror_reflection_6")
	self.parent:GenericHeal(
		self.ability.talents.q6_heal * self.parent:GetMaxHealth(),
		self.ability,
		true,
		"",
		"modifier_terror_reflection_6"
	)
end

modifier_custom_terrorblade_reflection_stun_delay = class(mod_hidden)
function modifier_custom_terrorblade_reflection_stun_delay:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.illusion = EntIndexToHScript(table.illusion)

	self.t = -1
	self.timer = self.ability.talents.q5_delay * 2
	self:StartIntervalThink(0.5)
	self:OnIntervalThink()
end

function modifier_custom_terrorblade_reflection_stun_delay:OnIntervalThink()
	if not IsServer() then
		return
	end

	if not self.illusion or self.illusion:IsNull() or not self.illusion:IsAlive() then
		self:Destroy()
		return
	end

	self.t = self.t + 1

	local number = (self.timer - self.t) / 2
	local int = number

	if number % 1 ~= 0 then
		int = number - 0.5
	end

	local digits = math.floor(math.log10(number)) + 2
	local decimal = number % 1

	if decimal == 0.5 then
		decimal = 8
	else
		decimal = 1
	end

	local particle =
		ParticleManager:CreateParticle("particles/huskar/huskar_timer.vpcf", PATTACH_OVERHEAD_FOLLOW, self.illusion)
	ParticleManager:SetParticleControl(particle, 0, self.illusion:GetAbsOrigin())
	ParticleManager:SetParticleControl(particle, 1, Vector(0, int, decimal))
	ParticleManager:SetParticleControl(particle, 2, Vector(digits, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)
end

function modifier_custom_terrorblade_reflection_stun_delay:OnDestroy()
	if not IsServer() then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self:GetRemainingTime() > 0.1 then
		return
	end
	if not self.illusion or self.illusion:IsNull() or not self.illusion:IsAlive() then
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/econ/items/silencer/silencer_ti10_immortal_shield/silencer_ti10_immortal_curse_aoe.vpcf",
		PATTACH_WORLDORIGIN,
		nil
	)
	ParticleManager:SetParticleControl(particle, 0, GetGroundPosition(self.parent:GetAbsOrigin(), nil))
	ParticleManager:SetParticleControl(particle, 1, Vector(250, 0, 0))
	ParticleManager:ReleaseParticleIndex(particle)

	self.parent:GenericParticle("particles/units/heroes/hero_brewmaster/brewmaster_dispel_magic.vpcf")

	self.parent:EmitSound("TB.Reflection_stun")
	self.parent:EmitSound("TB.Reflection_stun2")

	if not self.parent:IsDebuffImmune() then
		self.parent:Purge(true, false, false, false, false)
	end
	self.parent:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_bashed",
		{ duration = (1 - self.parent:GetStatusResistance()) * self.ability.talents.q5_stun }
	)
end

modifier_custom_terrorblade_reflection_legendary_autocast = class(mod_hidden)
function modifier_custom_terrorblade_reflection_legendary_autocast:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	local mod = self.parent:FindModifierByName("modifier_custom_terrorblade_reflection_legendary_pick")
	if mod then
		mod:Destroy()
	else
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_custom_terrorblade_reflection_legendary_pick",
			{}
		)
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_terrorblade_reflection_legendary_cd",
		{ duration = 0.5 }
	)

	self.ability:ToggleAutoCast()
	self:Destroy()
end

modifier_custom_terrorblade_reflection_legendary_cd = class(mod_hidden)