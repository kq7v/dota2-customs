--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier("modifier_axe_culling_blade_custom", "abilities/axe/axe_culling_blade_custom", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_tracker",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_attack_stack",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_axe_culling_3"
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_aegis",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_slow_legendary",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_target_mod",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_legendary_attacks",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_slow",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_root",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_axe_culling_4"
)
LinkLuaModifier(
	"modifier_axe_culling_blade_custom_root_cd",
	"abilities/axe/axe_culling_blade_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_axe_culling_4"
)

axe_culling_blade_custom = class({})
axe_culling_blade_custom.talents = {}
axe_culling_blade_custom.mods = {
	"modifier_tormentor_custom",
	"modifier_bane_nightmare_custom_legendary",
}

function axe_culling_blade_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_axe/axe_culling_blade_kill.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_axe/axe_culling_blade.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_axe/axe_cullingblade_sprint.vpcf", context)
	PrecacheResource("particle", "particles/wraith_king/wk_stack.vpcf", context)
	PrecacheResource("particle", "particles/legion_commander/lc_odd_charge_mark.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_overwhelming_start.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/blink_overwhelming_end.vpcf", context)
	PrecacheResource("particle", "particles/axe/axe_exe.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_lowhp_.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/ascetic_cap.vpcf", context)
	PrecacheResource("particle", "particles/axe/culling_stack.vpcf", context)
	PrecacheResource("particle", "particles/items3_fx/hook_root.vpcf", context)
end

function axe_culling_blade_custom:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			has_r1 = 0,
			r1_slow = 0,
			r1_damage = 0,
			r1_duration = caster:GetTalentValue("modifier_axe_culling_1", "duration", true),
			r1_damage_type = caster:GetTalentValue("modifier_axe_culling_1", "damage_type", true),
			r1_interval = caster:GetTalentValue("modifier_axe_culling_1", "interval", true),

			r2_heal = 0,
			r2_bonus = caster:GetTalentValue("modifier_axe_culling_2", "bonus", true),
			r2_health = caster:GetTalentValue("modifier_axe_culling_2", "health", true),

			has_r3 = 0,
			r3_damage = 0,
			r3_damage_stack = 0,
			r3_duration = caster:GetTalentValue("modifier_axe_culling_3", "duration", true),
			r3_max = caster:GetTalentValue("modifier_axe_culling_3", "max", true),

			has_r4 = 0,
			r4_root = caster:GetTalentValue("modifier_axe_culling_4", "root", true),
			r4_bkb = caster:GetTalentValue("modifier_axe_culling_4", "bkb", true),
			r4_radius = caster:GetTalentValue("modifier_axe_culling_4", "radius", true),
			r4_cd_inc = caster:GetTalentValue("modifier_axe_culling_4", "cd_inc", true),
			r4_health = caster:GetTalentValue("modifier_axe_culling_4", "health", true),
			r4_talent_cd = caster:GetTalentValue("modifier_axe_culling_4", "talent_cd", true),
		}
	end

	if caster:HasTalent("modifier_axe_culling_1") then
		self.talents.has_r1 = 1
		self.talents.r1_slow = caster:GetTalentValue("modifier_axe_culling_1", "slow")
		self.talents.r1_damage = caster:GetTalentValue("modifier_axe_culling_1", "damage") / 100
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_axe_culling_2") then
		self.talents.r2_heal = caster:GetTalentValue("modifier_axe_culling_2", "heal") / 100
		caster:AddLifesteal(self.tracker, {
			name = "modifier_axe_culling_2",
			type = 2,
			value = function(params)
				if params.unit and params.unit:GetHealthPercent() >= self.talents.r2_health then
					return self.talents.r2_heal * self.talents.r2_bonus
				end
				return self.talents.r2_heal
			end,
		})
	end

	if caster:HasTalent("modifier_axe_culling_3") then
		self.talents.has_r3 = 1
		self.talents.r3_damage = caster:GetTalentValue("modifier_axe_culling_3", "damage")
		self.talents.r3_damage_stack = caster:GetTalentValue("modifier_axe_culling_3", "damage_stack") / 100
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_axe_culling_4") then
		self.talents.has_r4 = 1
		caster:AddProc(self.tracker, { land = true })
	end
end

function axe_culling_blade_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "axe_culling_blade", self)
end

function axe_culling_blade_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_axe_culling_blade_custom_tracker"
end

function axe_culling_blade_custom:OnAbilityPhaseStart()
	self.caster:StartGestureWithPlaybackRate(ACT_DOTA_CAST_ABILITY_4, 1)
	return true
end

function axe_culling_blade_custom:OnAbilityPhaseInterrupted()
	self.caster:FadeGesture(ACT_DOTA_CAST_ABILITY_4)
end

function axe_culling_blade_custom:OnSpellStart()
	local target = self:GetCursorTarget()

	local damage_mod = target:FindModifierByName("modifier_axe_culling_blade_custom_attack_stack")
	local damage = self.damage

	if damage_mod then
		damage = damage
			+ damage_mod:GetStackCount()
				* self.talents.r3_damage_stack
				* self.caster:GetAverageTrueAttackDamage(nil)
		damage_mod:Destroy()
	end

	local kill_mod
	local kill_mod_2

	if not self:InvalidMods(target) then
		kill_mod = target:AddNewModifier(target, nil, "modifier_death", {})
		kill_mod_2 = target:AddNewModifier(target, nil, "modifier_axe_culling_blade_custom_aegis", {})
	end

	if target:GetHealth() > damage or self:InvalidMods(target) then
		DoDamage({
			victim = target,
			attacker = self.caster,
			damage = damage,
			damage_type = DAMAGE_TYPE_PURE,
			ability = self,
			custom_flag = CUSTOM_FLAG_AXE_CULLING_BLADE,
		})
	else
		self:CullingBladeKill(target, true, true)
		target:Kill(self, self.caster)
	end

	if IsValid(kill_mod) then
		kill_mod:Destroy()
	end

	if IsValid(kill_mod_2) then
		kill_mod_2:Destroy()
	end
end

function axe_culling_blade_custom:InvalidMods(target)
	for _, mod in pairs(self.mods) do
		if target:HasModifier(mod) then
			return true
		end
	end
	return false
end

function axe_culling_blade_custom:CullingBladeKill(target, success, effect)
	if not IsServer() then
		return
	end
	local direction = (target:GetOrigin() - self.caster:GetOrigin()):Normalized()

	local particle_cast = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_axe/axe_culling_blade.vpcf",
		self
	)
	local sound_cast = "Hero_Axe.Culling_Blade_Fail"

	if success then
		particle_cast = wearables_system:GetParticleReplacementAbility(
			self.caster,
			"particles/units/heroes/hero_axe/axe_culling_blade_kill.vpcf",
			self
		)
		sound_cast = wearables_system:GetSoundReplacement(self.caster, "Hero_Axe.Culling_Blade_Success", self)
	end

	local effect_cast = ParticleManager:CreateParticle(particle_cast, PATTACH_ABSORIGIN_FOLLOW, target)
	if particle_cast == "particles/econ/items/axe/axe_carnival/axe_carnival_culling_blade_kill.vpcf" then
		ParticleManager:SetParticleControl(effect_cast, 0, target:GetOrigin())
		ParticleManager:SetParticleControl(effect_cast, 3, self.caster:GetOrigin())
		ParticleManager:SetParticleControl(effect_cast, 4, target:GetOrigin())
	else
		ParticleManager:SetParticleControl(effect_cast, 4, target:GetOrigin())
		ParticleManager:SetParticleControlForward(effect_cast, 3, direction)
		ParticleManager:SetParticleControlForward(effect_cast, 4, direction)
	end
	ParticleManager:ReleaseParticleIndex(effect_cast)

	target:EmitSound(sound_cast)

	if not success then
		return
	end

	self:EndCd(0)

	if
		particle_cast == "particles/econ/items/axe/ti9_jungle_axe/ti9_jungle_axe_culling_blade_kill.vpcf"
		or self.caster:HasUnequipItem(12964)
	then
		self.caster:EmitSound("Hero_Axe.JungleWeapon.Dunk")
	end

	if not target:IsValidKill(self.caster) then
		return
	end

	if self.caster:GetQuest() == "Axe.Quest_8" then
		self.caster:UpdateQuest(1)
	end
	local mod = self.caster:FindModifierByName("modifier_axe_coat_of_blood_custom")
	if mod then
		mod:AddStack()
	end
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_axe_culling_blade_custom",
		{ duration = self.speed_duration }
	)
end

modifier_axe_culling_blade_custom_tracker = class(mod_hidden)
function modifier_axe_culling_blade_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.culling_legendary_ability = self.parent:FindAbilityByName("axe_culling_blade_custom_legendary")
	if IsValid(self.parent.culling_legendary_ability) then
		self.parent.culling_legendary_ability:UpdateTalents()
	end

	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.speed_duration = self.ability:GetSpecialValueFor("speed_duration")
	self.ability.armor_buff = self.ability:GetSpecialValueFor("armor_buff")
	self.ability.speed_bonus = self.ability:GetSpecialValueFor("speed_bonus")

	if not IsServer() then
		return
	end
	self.parent:AddDamageEvent_out(self, true)
end

function modifier_axe_culling_blade_custom_tracker:OnRefresh(table)
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.armor_buff = self.ability:GetSpecialValueFor("armor_buff")
	self.ability.speed_bonus = self.ability:GetSpecialValueFor("speed_bonus")
end

function modifier_axe_culling_blade_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_axe_culling_blade_custom_tracker:GetModifierDamageOutgoing_Percentage()
	return self.ability.talents.r3_damage
end

function modifier_axe_culling_blade_custom_tracker:GetProcChance()
	return 100
end

function modifier_axe_culling_blade_custom_tracker:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_r1 == 1 then
		target:AddNewModifier(self.parent, self.ability, "modifier_axe_culling_blade_custom_slow", {})
	end

	if self.ability.talents.has_r3 == 1 then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_axe_culling_blade_custom_attack_stack",
			{ duration = self.ability.talents.r3_duration }
		)
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_axe_culling_blade_custom_target_mod",
			{ target = target:entindex() }
		)
	end

	if
		self.ability.talents.has_r4 == 1
		and not self.parent:HasModifier("modifier_axe_culling_blade_custom_root_cd")
		and target:IsHero()
	then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_axe_culling_blade_custom_root_cd", {})
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_generic_debuff_immune",
			{ duration = self.ability.talents.r4_bkb, sound = 1, effect = 2 }
		)
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_axe_culling_blade_custom_root",
			{ duration = self.ability.talents.r4_root * (1 - target:GetStatusResistance()) }
		)
	end
end

function modifier_axe_culling_blade_custom_tracker:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if params.custom_flag ~= CUSTOM_FLAG_AXE_CULLING_BLADE then
		return
	end

	local target = params.unit
	local success = false
	if target:GetHealth() <= 1 and not self.ability:InvalidMods(target) then
		success = true
	end
	self.ability:CullingBladeKill(target, success, true)
end

modifier_axe_culling_blade_custom = class(mod_visible)
function modifier_axe_culling_blade_custom:OnCreated(kv)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.armor_bonus = self.ability.armor_buff
	self.ms_bonus = self.ability.speed_bonus

	if not IsServer() then
		return
	end
	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_axe/axe_cullingblade_sprint.vpcf",
		self.ability
	)
	local axe_buff_pfx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_axe/axe_cullingblade_sprint_axe.vpcf",
		self.ability
	)

	if
		axe_buff_pfx == "particles/econ/items/axe/ti9_jungle_axe/ti9_jungle_axe_cullingblade_sprint_axe.vpcf"
		and self.parent == self.caster
	then
		local bonus_particle_buff = ParticleManager:CreateParticle(axe_buff_pfx, PATTACH_ABSORIGIN_FOLLOW, self.caster)
		ParticleManager:SetParticleControlEnt(
			bonus_particle_buff,
			2,
			self.caster,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_eye_l",
			self.caster:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControlEnt(
			bonus_particle_buff,
			3,
			self.caster,
			PATTACH_ABSORIGIN_FOLLOW,
			"attach_eye_r",
			self.caster:GetAbsOrigin(),
			true
		)
		self:AddParticle(bonus_particle_buff, false, false, -1, false, false)
	end

	self.parent:GenericParticle(particle_name, self)
end

function modifier_axe_culling_blade_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
	}
end

function modifier_axe_culling_blade_custom:GetModifierMoveSpeedBonus_Percentage()
	return self.ms_bonus
end

function modifier_axe_culling_blade_custom:GetModifierPhysicalArmorBonus()
	return self.armor_bonus
end

modifier_axe_culling_blade_custom_attack_stack = class(mod_hidden)
function modifier_axe_culling_blade_custom_attack_stack:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r3_max

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self.particle = self.parent:GenericParticle("particles/wraith_king/wk_stack.vpcf", self, true)

	self:OnRefresh()
end

function modifier_axe_culling_blade_custom_attack_stack:OnRefresh(table)
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= 10 then
		if self.particle then
			ParticleManager:Delete(self.particle, 2)
			self.particle = nil
			self.particle_2 = self.parent:GenericParticle("particles/axe/culling_stack.vpcf", self, true)
		end
		local k1 = math.floor(self:GetStackCount() / 10)
		ParticleManager:SetParticleControl(self.particle_2, 1, Vector(k1, self:GetStackCount() - k1 * 10, 0))
	else
		ParticleManager:SetParticleControl(self.particle, 1, Vector(0, self:GetStackCount(), 0))
	end
end

modifier_axe_culling_blade_custom_target_mod = class(mod_hidden)
function modifier_axe_culling_blade_custom_target_mod:OnCreated(params)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.damage = self.ability.damage
	self.target = EntIndexToHScript(params.target)
	self.damage_bonus = self.ability.talents.r3_damage_stack

	self:OnIntervalThink()
	self:StartIntervalThink(0.5)
end

function modifier_axe_culling_blade_custom_target_mod:OnRefresh(params)
	if not IsServer() then
		return
	end
	self.target = EntIndexToHScript(params.target)
	self:OnIntervalThink()
end

function modifier_axe_culling_blade_custom_target_mod:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.target) or not self.target:HasModifier("modifier_axe_culling_blade_custom_attack_stack") then
		self:Destroy()
		return
	end
	local mod = self.target:FindModifierByName("modifier_axe_culling_blade_custom_attack_stack")

	local damage = self.damage + mod:GetStackCount() * self.damage_bonus * self.parent:GetAverageTrueAttackDamage(nil)
	self.parent:UpdateUIlong({
		override_stack = math.floor(damage * (1 + self.parent:GetSpellAmplification(false))),
		no_min = 1,
		style = "AxeCulling",
	})
end

function modifier_axe_culling_blade_custom_target_mod:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:UpdateUIlong({ override_stack = 0, no_min = 1, style = "AxeCulling" })
end

modifier_axe_culling_blade_custom_aegis = class(mod_hidden)

modifier_axe_culling_blade_custom_slow = class(mod_hidden)
function modifier_axe_culling_blade_custom_slow:IsPurgable()
	return true
end
function modifier_axe_culling_blade_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.r1_duration
	self.slow = self.ability.talents.r1_slow
	self.interval = self.ability.talents.r1_interval
	self.damage = self.ability.talents.r1_damage * self.interval

	if not IsServer() then
		return
	end
	self.parent:EmitSound("DOTA_Item.Maim")
	self.parent:GenericParticle("particles/items2_fx/sange_maim.vpcf", self)

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		damage_type = self.ability.talents.r1_damage_type,
		ability = self.ability,
	}
	self:SetStackCount(self.max)
	self:StartIntervalThink(self.interval)
end

function modifier_axe_culling_blade_custom_slow:OnRefresh()
	if not IsServer() then
		return
	end
	self:SetStackCount(self.max)
end

function modifier_axe_culling_blade_custom_slow:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.damageTable.damage = self.damage * self.caster:GetAverageTrueAttackDamage(nil)
	DoDamage(self.damageTable, "modifier_axe_culling_1")

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
	end
end

function modifier_axe_culling_blade_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_axe_culling_blade_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_axe_culling_blade_custom_root = class(mod_hidden)
function modifier_axe_culling_blade_custom_root:IsPurgable()
	return true
end
function modifier_axe_culling_blade_custom_root:OnCreated(table)
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.parent:EmitSound("Pudge.Hook_Root")
	self.parent:GenericParticle("particles/items3_fx/hook_root.vpcf", self)
end

function modifier_axe_culling_blade_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_axe_culling_blade_custom_root_cd = class(mod_cd)
function modifier_axe_culling_blade_custom_root_cd:GetTexture()
	return "buffs/axe/culling_4"
end
function modifier_axe_culling_blade_custom_root_cd:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.RemoveForDuel = true

	if not IsServer() then
		return
	end
	self.interval = 0.1
	self.count = 0

	self:SetStackCount(self.ability.talents.r4_talent_cd)
	self:StartIntervalThink(self.interval)
end

function modifier_axe_culling_blade_custom_root_cd:OnIntervalThink()
	if not IsServer() then
		return
	end

	local k = 1
	for _, player in pairs(players) do
		if
			player:GetTeamNumber() ~= self.parent:GetTeamNumber()
			and player:GetHealthPercent() <= self.ability.talents.r4_health
			and player:IsAlive()
			and (player:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() <= self.ability.talents.r4_radius
		then
			k = self.ability.talents.r4_cd_inc
			break
		end
	end
	self.count = self.count + self.interval * k

	if self.count < (1 - FrameTime()) then
		return
	end
	self.count = 0

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
		return
	end
end

axe_culling_blade_custom_legendary = class({})
axe_culling_blade_custom_legendary.talents = {}

function axe_culling_blade_custom_legendary:CreateTalent()
	self:SetHidden(false)
	self:SetLevel(1)
end

function axe_culling_blade_custom_legendary:UpdateTalents(name)
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			r7_damage = caster:GetTalentValue("modifier_axe_culling_7", "damage", true),
			r7_talent_cd = caster:GetTalentValue("modifier_axe_culling_7", "talent_cd", true),
			r7_attacks = caster:GetTalentValue("modifier_axe_culling_7", "attacks", true),
			r7_health = caster:GetTalentValue("modifier_axe_culling_7", "health", true),
			r7_cd_low = caster:GetTalentValue("modifier_axe_culling_7", "cd_low", true),
		}
	end
end

function axe_culling_blade_custom_legendary:GetCooldown(iLevel)
	return self.talents.r7_talent_cd or 0
end

function axe_culling_blade_custom_legendary:OnSpellStart()
	local target = self:GetCursorTarget()

	if target:GetHealthPercent() > self.talents.r7_health then
		self:EndCd(0)
		self:StartCooldown(self.talents.r7_cd_low)
	end

	if target:TriggerSpellAbsorb(self) then
		return
	end

	local direction = (target:GetOrigin() - self.caster:GetOrigin()):Normalized()
	local old_pos = self.caster:GetAbsOrigin()

	self.caster:Teleport(
		target:GetAbsOrigin(),
		true,
		"particles/items3_fx/blink_overwhelming_start.vpcf",
		"particles/items3_fx/blink_overwhelming_end.vpcf"
	)

	target:AddNewModifier(self.caster, self, "modifier_axe_culling_blade_custom_slow_legendary", {})

	local particle_name = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_axe/axe_culling_blade_kill.vpcf",
		self
	)
	local effect_cast = ParticleManager:CreateParticle(particle_name, PATTACH_ABSORIGIN_FOLLOW, target)
	if particle_name == "particles/econ/items/axe/axe_carnival/axe_carnival_culling_blade_kill.vpcf" then
		ParticleManager:SetParticleControl(effect_cast, 0, target:GetOrigin())
		ParticleManager:SetParticleControl(effect_cast, 3, old_pos)
		ParticleManager:SetParticleControl(effect_cast, 4, target:GetOrigin())
	else
		ParticleManager:SetParticleControl(effect_cast, 4, target:GetOrigin())
		ParticleManager:SetParticleControlForward(effect_cast, 3, direction)
		ParticleManager:SetParticleControlForward(effect_cast, 4, direction)
	end
	ParticleManager:ReleaseParticleIndex(effect_cast)

	target:EmitSound("Axe.Culling_legendary")
	target:EmitSound("Axe.Culling_legendary2")
end

modifier_axe_culling_blade_custom_slow_legendary = class(mod_hidden)
function modifier_axe_culling_blade_custom_slow_legendary:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.slow = -100

	if not IsServer() then
		return
	end
	self:SetStackCount(self.ability.talents.r7_attacks)
	self.interval = 0.25
	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_axe_culling_blade_custom_slow_legendary:OnIntervalThink()
	if not IsServer() then
		return
	end

	if self.caster.call_ability then
		self.caster.call_ability:ProcCd()
	end

	self.caster:AddNewModifier(self.caster, self.ability, "modifier_axe_culling_blade_custom_legendary_attacks", {})
	self.caster:PerformAttack(self.parent, true, true, true, true, false, false, true)
	self.caster:RemoveModifierByName("modifier_axe_culling_blade_custom_legendary_attacks")
	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
	end
end

function modifier_axe_culling_blade_custom_slow_legendary:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_axe_culling_blade_custom_slow_legendary:GetModifierMoveSpeedBonus_Percentage()
	return self.slow
end

modifier_axe_culling_blade_custom_legendary_attacks = class(mod_hidden)
function modifier_axe_culling_blade_custom_legendary_attacks:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.r7_damage - 100
end

function modifier_axe_culling_blade_custom_legendary_attacks:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_axe_culling_blade_custom_legendary_attacks:GetModifierTotalDamageOutgoing_Percentage(params)
	if params.inflictor then
		return
	end
	return self.damage
end