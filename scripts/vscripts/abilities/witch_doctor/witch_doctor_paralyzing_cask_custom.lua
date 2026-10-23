--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom_tracker",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom_legendary_cd",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE,
	{ true, "modifier_witch_doctor_cask_7" }
)
LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom_legendary_speed",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_cask_7"
)
LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom_poison",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_cask_3"
)
LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom_slow",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_cask_2"
)
LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom_auto_cd",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_cask_4"
)
LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom_root",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_witch_doctor_deathward_4"
)
LinkLuaModifier(
	"modifier_witch_doctor_paralyzing_cask_custom_root_cd",
	"abilities/witch_doctor/witch_doctor_paralyzing_cask_custom",
	LUA_MODIFIER_MOTION_NONE
)

witch_doctor_paralyzing_cask_custom = class({})
witch_doctor_paralyzing_cask_custom.talents = {}
witch_doctor_paralyzing_cask_custom.active_mods = {}

function witch_doctor_paralyzing_cask_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end
	PrecacheResource("particle", "particles/units/heroes/hero_witchdoctor/witchdoctor_cask.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", context)
	PrecacheResource("particle", "particles/void_spirit/remnant_hit.vpcf", context)
	PrecacheResource("particle", "particles/alchemist/weaponry_proc.vpcf", context)
	PrecacheResource("particle", "particles/leshrac/storm_refresh.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_lina/lina_supercharge_buff.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", context)
	PrecacheResource("particle", "particles/witch_doctor/ward_root.vpcf", context)
end

function witch_doctor_paralyzing_cask_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			q1_damage = 0,
			q1_speed = 0,

			has_q2 = 0,
			q2_range = 0,
			q2_slow = 0,
			q2_duration = caster:GetTalentValue("modifier_witch_doctor_cask_2", "duration", true),

			has_q3 = 0,
			q3_base = 0,
			q3_damage = 0,
			q3_heal = caster:GetTalentValue("modifier_witch_doctor_cask_3", "heal", true) / 100,
			q3_duration = caster:GetTalentValue("modifier_witch_doctor_cask_3", "duration", true),
			q3_interval = caster:GetTalentValue("modifier_witch_doctor_cask_3", "interval", true),
			q3_chance = caster:GetTalentValue("modifier_witch_doctor_cask_3", "chance", true),
			q3_damage_type = caster:GetTalentValue("modifier_witch_doctor_cask_3", "damage_type", true),
			q3_chance_ward = caster:GetTalentValue("modifier_witch_doctor_cask_3", "chance_ward", true),

			has_q4 = 0,
			q4_max = caster:GetTalentValue("modifier_witch_doctor_cask_4", "max", true),
			q4_stun = caster:GetTalentValue("modifier_witch_doctor_cask_4", "stun", true),
			q4_talent_cd = caster:GetTalentValue("modifier_witch_doctor_cask_4", "talent_cd", true),
			q4_range = caster:GetTalentValue("modifier_witch_doctor_cask_4", "range", true),
			q4_radius = caster:GetTalentValue("modifier_witch_doctor_cask_4", "radius", true),

			has_q7 = 0,
			q7_duration = caster:GetTalentValue("modifier_witch_doctor_cask_7", "duration", true),
			q7_max = caster:GetTalentValue("modifier_witch_doctor_cask_7", "max", true),
			q7_speed = caster:GetTalentValue("modifier_witch_doctor_cask_7", "speed", true),
			q7_radius = caster:GetTalentValue("modifier_witch_doctor_cask_7", "radius", true),
			q7_chance = caster:GetTalentValue("modifier_witch_doctor_cask_7", "chance", true),
			q7_talent_cd = caster:GetTalentValue("modifier_witch_doctor_cask_7", "talent_cd", true),
			q7_count = caster:GetTalentValue("modifier_witch_doctor_cask_7", "count", true),
			q7_damage = caster:GetTalentValue("modifier_witch_doctor_cask_7", "damage", true) / 100,

			h1_cd = 0,
			h1_range = 0,

			has_r4 = 0,
			r4_vision = caster:GetTalentValue("modifier_witch_doctor_deathward_4", "vision", true),
			r4_root = caster:GetTalentValue("modifier_witch_doctor_deathward_4", "root", true),
			r4_talent_cd = caster:GetTalentValue("modifier_witch_doctor_deathward_4", "talent_cd", true),
			r4_chance = caster:GetTalentValue("modifier_witch_doctor_deathward_4", "chance", true),

			has_r7 = 0,
		}
	end

	if caster:HasTalent("modifier_witch_doctor_cask_1") then
		self.talents.q1_damage = caster:GetTalentValue("modifier_witch_doctor_cask_1", "damage") / 100
		self.talents.q1_speed = caster:GetTalentValue("modifier_witch_doctor_cask_1", "speed")
	end

	if caster:HasTalent("modifier_witch_doctor_cask_2") then
		self.talents.has_q2 = 1
		self.talents.q2_range = caster:GetTalentValue("modifier_witch_doctor_cask_2", "range")
		self.talents.q2_slow = caster:GetTalentValue("modifier_witch_doctor_cask_2", "slow")
		caster:AddProc(self.tracker, { name = "hit", land = true })
	end

	if caster:HasTalent("modifier_witch_doctor_cask_3") then
		self.talents.has_q3 = 1
		self.talents.q3_base = caster:GetTalentValue("modifier_witch_doctor_cask_3", "base")
		self.talents.q3_damage = caster:GetTalentValue("modifier_witch_doctor_cask_3", "damage") / 100
		caster:AddProc(self.tracker, { name = "hit", land = true })
		caster:AddProc(self.tracker, { name = "poison", illusion = true, prd_owner = true, land = true })
	end

	if caster:HasTalent("modifier_witch_doctor_cask_4") then
		self.talents.has_q4 = 1
		caster:AddSpellEvent(self.tracker, true)
	end

	if caster:HasTalent("modifier_witch_doctor_cask_7") then
		self.talents.has_q7 = 1
		caster:AddProc(self.tracker, { group = "modifier_witch_doctor_cask_7", extra = false })
		self.tracker:UpdateUI()
	end

	if caster:HasTalent("modifier_witch_doctor_hero_1") then
		self.talents.h1_cd = caster:GetTalentValue("modifier_witch_doctor_hero_1", "cd")
		self.talents.h1_range = caster:GetTalentValue("modifier_witch_doctor_hero_1", "range")
	end

	if caster:HasTalent("modifier_witch_doctor_deathward_4") then
		self.talents.has_r4 = 1
		caster:AddProc(self.tracker, { name = "hit", land = true })
		caster:AddProc(
			self.tracker,
			{
				name = "root",
				group = "modifier_witch_doctor_deathward_4",
				illusion = true,
				land = true,
				prd_owner = true,
			}
		)
	end

	if caster:HasTalent("modifier_witch_doctor_deathward_7") then
		self.talents.has_r7 = 1
	end
end

function witch_doctor_paralyzing_cask_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "witch_doctor_paralyzing_cask", self)
end

function witch_doctor_paralyzing_cask_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_witch_doctor_paralyzing_cask_custom_tracker"
end

function witch_doctor_paralyzing_cask_custom:GetCooldown(level)
	return self.BaseClass.GetCooldown(self, level) + (self.talents.h1_cd or 0)
end

function witch_doctor_paralyzing_cask_custom:OnSpellStart(new_target, source, ward_unit)
	local target = new_target or self:GetCursorTarget()
	local legendary = source == "legendary" and 1 or 0
	local auto = source == "auto" and 1 or 0

	if self.talents.has_r7 == 1 and IsValid(self.caster.deathward_legendary_ability) and not new_target then
		self.caster.deathward_legendary_ability:AddCharge(1, "particles/leshrac/storm_refresh.vpcf")
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_witch_doctor_paralyzing_cask_custom",
		{ target = target:entindex(), legendary = legendary, auto = auto, new_caster = ward_unit }
	)
end

function witch_doctor_paralyzing_cask_custom:OnProjectileHit_ExtraData(target, vLocation, table)
	if not target then
		return
	end

	local mod = self.active_mods[table.mod_index]
	if not IsValid(mod) then
		return
	end

	local damage_ability = nil
	local damage_k = 1
	if table.is_auto == 1 then
		damage_ability = "modifier_witch_doctor_cask_4"
	end
	if table.is_legendary == 1 then
		damage_ability = "modifier_witch_doctor_cask_7"
		damage_k = self.talents.q7_damage
	end

	mod:NewTarget(target:GetAbsOrigin())

	if self.caster:GetTeamNumber() ~= target:GetTeamNumber() then
		if table.is_first == 1 then
			if target:TriggerSpellAbsorb(self) then
				return
			end
		end
		local stun = self.stun_duration + (self.talents.has_q4 == 1 and self.talents.q4_stun or 0)
		local damage = (self.base_damage + self.caster:GetAverageTrueAttackDamage(nil) * self.attack_damage)
			* (1 + self.talents.q1_damage)
		local damageTable = {
			victim = target,
			damage = damage * damage_k,
			ability = self,
			damage_type = DAMAGE_TYPE_MAGICAL,
			attacker = self.caster,
		}
		DoDamage(damageTable, damage_ability)

		target:AddNewModifier(
			self.caster,
			self,
			"modifier_stunned",
			{ duration = (1 - target:GetStatusResistance()) * stun }
		)

		if target:IsRealHero() and self.caster:GetQuest() == "WitchDoctor.Quest_5" then
			self.caster:UpdateQuest(1)
		end
	end

	local bounce_sound =
		wearables_system:GetSoundReplacement(self.caster, "Hero_WitchDoctor.Paralyzing_Cask_Bounce", self)
	target:EmitSound(bounce_sound)
end

function witch_doctor_paralyzing_cask_custom:SearchTarget(current_target, point)
	local radius = self.bounce_range + (self.talents.has_q4 == 1 and self.talents.q4_range or 0)
	local ward_ability = self.caster.deathward_ability

	local targets = self.caster:FindTargets(radius, point)

	for index, target in pairs(targets) do
		if IsValid(current_target) and target == current_target then
			table.remove(targets, index)
		end
	end

	if #targets <= 0 and IsValid(current_target) and current_target:GetTeamNumber() ~= self.caster:GetTeamNumber() then
		if self.caster:IsAlive() and (self.caster:GetAbsOrigin() - point):Length2D() <= radius then
			table.insert(targets, self.caster)
		end

		if IsValid(ward_ability) and ward_ability.wards then
			for ward, _ in pairs(ward_ability.wards) do
				if (ward:GetAbsOrigin() - point):Length2D() <= radius then
					table.insert(targets, ward)
				end
			end
		end
	end

	return targets
end

function witch_doctor_paralyzing_cask_custom:ProcAttack(target, procs)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end

	local proc = procs and procs[self.tracker]

	if self.talents.has_q2 == 1 then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_witch_doctor_paralyzing_cask_custom_slow",
			{ duration = self.talents.q2_duration }
		)
	end

	if proc and proc.poison then
		target:AddNewModifier(
			self.caster,
			self,
			"modifier_witch_doctor_paralyzing_cask_custom_poison",
			{ duration = self.talents.q3_duration + 0.2 }
		)
	end

	if self.talents.has_r4 == 1 then
		if target:IsRealHero() then
			target:AddNewModifier(self.caster, self, "modifier_generic_vision", { duration = self.talents.r4_vision })
		end
		if proc and proc.root and self:CanRoot(target) then
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_witch_doctor_paralyzing_cask_custom_root_cd",
				{ duration = self.talents.r4_talent_cd }
			)
			target:AddNewModifier(
				self.caster,
				self,
				"modifier_witch_doctor_paralyzing_cask_custom_root",
				{ duration = (1 - target:GetStatusResistance()) * self.talents.r4_root }
			)
		end
	end
end

function witch_doctor_paralyzing_cask_custom:CanRoot(target)
	if target:HasModifier("modifier_witch_doctor_paralyzing_cask_custom_root_cd") then
		return false
	end
	return not target:IsDebuffImmune()
end

function witch_doctor_paralyzing_cask_custom:GetLegendaryChance()
	if not self.caster:IsAlive() then
		return 0
	end
	if self.caster:HasModifier("modifier_witch_doctor_paralyzing_cask_custom_legendary_cd") then
		return 0
	end
	return self.talents.q7_chance
end

function witch_doctor_paralyzing_cask_custom:ProcLegendary(target, ward_unit, is_proc)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_q7 == 0 then
		return
	end
	local chance = self:GetLegendaryChance()
	if chance <= 0 then
		return
	end
	if not is_proc and not RollPseudoRandomPercentage(chance, "modifier_witch_doctor_cask_7", self.caster) then
		return
	end

	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_witch_doctor_paralyzing_cask_custom_legendary_cd",
		{ duration = self.talents.q7_talent_cd }
	)
	self:OnSpellStart(target, "legendary", ward_unit)
end

modifier_witch_doctor_paralyzing_cask_custom = class(mod_hidden)
function modifier_witch_doctor_paralyzing_cask_custom:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_witch_doctor_paralyzing_cask_custom:RemoveOnDeath()
	return false
end
function modifier_witch_doctor_paralyzing_cask_custom:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	self.speed = self.ability.speed
	self.interval = self.ability.bounce_delay
	self.max = self.ability.bounces
	self.max_duration = 10
	self.is_first = 1

	if not IsServer() then
		return
	end

	if self.ability.talents.has_q7 == 1 then
		self.caster:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_witch_doctor_paralyzing_cask_custom_legendary_speed",
			{ duration = self.ability.talents.q7_duration }
		)
	end

	self.current_target = self.parent

	self.is_legendary = table.legendary
	self.is_auto = table.auto

	if self.is_legendary == 1 then
		self.max = self.ability.talents.q7_count
	end

	if self.is_auto == 1 then
		self.max = self.ability.talents.q4_max
	end

	if table.new_max then
		self.max = table.new_max
	end

	if table.new_caster then
		self.new_caster = EntIndexToHScript(table.new_caster)
		if IsValid(self.new_caster) then
			self.current_target = self.new_caster
		end
	end

	local cast_sound = wearables_system:GetSoundReplacement(self.caster, "Hero_WitchDoctor.Paralyzing_Cask_Cast", self)
	self.cast_fx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_witchdoctor/witchdoctor_cask.vpcf",
		self
	)

	self.current_target:EmitSound(cast_sound)

	self.mod_index = 1
	if #self.ability.active_mods > 0 then
		for i = 1, (#self.ability.active_mods + 1) do
			if not IsValid(self.ability.active_mods[i]) then
				self.mod_index = i
				break
			end
		end
	end

	self.ability.active_mods[self.mod_index] = self

	self.new_target = nil
	local first_target = EntIndexToHScript(table.target)
	self:Launch(first_target)
end

function modifier_witch_doctor_paralyzing_cask_custom:Launch(new_target)
	if not IsServer() then
		return
	end
	if not IsValid(new_target) then
		self:Destroy()
		return
	end

	self:SetDuration(self.max_duration, true)
	local info = {
		Target = new_target,
		Source = self.current_target,
		Ability = self.ability,
		iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_HITLOCATION,
		EffectName = self.cast_fx,
		iMoveSpeed = self.speed,
		bDodgeable = false,
		bVisibleToEnemies = true,
		bProvidesVision = false,
		ExtraData = {
			mod_index = self.mod_index,
			is_first = self.is_first,
			is_legendary = self.is_legendary,
			is_auto = self.is_auto,
			stack = self:GetStackCount(),
		},
	}
	ProjectileManager:CreateTrackingProjectile(info)

	self.is_first = 0
	self.current_target = new_target
end

function modifier_witch_doctor_paralyzing_cask_custom:NewTarget(point)
	if not IsServer() then
		return
	end
	local targets = self.ability:SearchTarget(self.current_target, point)

	self:IncrementStackCount()
	if self:GetStackCount() > self.max then
		self:Destroy()
		return
	end

	if #targets <= 0 then
		self:Destroy()
		return
	end

	self.new_target = targets[RandomInt(1, #targets)]
	self:StartIntervalThink(self.interval)
end

function modifier_witch_doctor_paralyzing_cask_custom:OnIntervalThink()
	if not IsServer() then
		return
	end
	self:Launch(self.new_target)
	self:StartIntervalThink(-1)
end

function modifier_witch_doctor_paralyzing_cask_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.ability.active_mods[self.mod_index] = nil
end

modifier_witch_doctor_paralyzing_cask_custom_tracker = class(mod_hidden)
function modifier_witch_doctor_paralyzing_cask_custom_tracker:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.cask_ability = self.ability

	self.ability.stun_duration = self.ability:GetSpecialValueFor("hero_duration")
	self.ability.creeps_damage = self.ability:GetSpecialValueFor("creeps_damage") / 100
	self.ability.base_damage = self.ability:GetSpecialValueFor("base_damage")
	self.ability.bounces = self.ability:GetSpecialValueFor("bounces")
	self.ability.bounce_range = self.ability:GetSpecialValueFor("bounce_range")
	self.ability.speed = self.ability:GetSpecialValueFor("speed")
	self.ability.bounce_delay = self.ability:GetSpecialValueFor("bounce_delay")
	self.ability.attack_damage = self.ability:GetSpecialValueFor("attack_damage") / 100
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:OnRefresh()
	self.ability.base_damage = self.ability:GetSpecialValueFor("base_damage")
	self.ability.attack_damage = self.ability:GetSpecialValueFor("attack_damage") / 100
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:AttackProc(params, name)
	if name ~= "hit" then
		return
	end
	if params.attack_flag == "wd_ward" then
		return
	end

	self.ability:ProcAttack(params.target, params.procs)
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_CAST_RANGE_BONUS_STACKING,
	}
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:GetModifierCastRangeBonusStacking()
	return self.ability.talents.h1_range
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:GetModifierAttackSpeedBonus_Constant()
	if self.ability.talents.has_r7 == 1 then
		return
	end
	return self.ability.talents.q1_speed
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:GetModifierAttackRangeBonus()
	return self.ability.talents.q2_range
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:SpellEvent(params)
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q4 == 0 then
		return
	end
	if not self.parent:IsAlive() then
		return
	end
	if self.parent:HasModifier("modifier_witch_doctor_paralyzing_cask_custom_auto_cd") then
		return
	end
	if params.ability:IsItem() then
		return
	end

	local unit = params.unit

	if not unit:IsUnit() then
		return
	end
	if self.parent:GetTeamNumber() == unit:GetTeamNumber() then
		return
	end
	if (unit:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.ability.talents.q4_radius then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_witch_doctor_paralyzing_cask_custom_auto_cd",
		{ duration = self.ability.talents.q4_talent_cd }
	)
	self.ability:OnSpellStart(unit, "auto")
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:GetProcChance(params, name)
	if name == "hit" then
		return 100
	end
	if name == "default" then
		return self.ability:GetLegendaryChance()
	end
	local is_ward = params.attacker.attack_flag == "wd_ward"
	if params.attacker ~= self.parent and not is_ward then
		return 0
	end
	if name == "poison" then
		return is_ward and self.ability.talents.q3_chance_ward or self.ability.talents.q3_chance
	end
	if not self.ability:CanRoot(params.target) then
		return 0
	end
	return self.ability.talents.r4_chance
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:AttackProcStart(params, name)
	if name ~= "default" then
		return
	end
	self.ability:ProcLegendary(params.target, nil, true)
end

function modifier_witch_doctor_paralyzing_cask_custom_tracker:UpdateUI()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_q7 == 0 then
		return
	end
	local stack = 0
	local mod = self.parent:FindModifierByName("modifier_witch_doctor_paralyzing_cask_custom_legendary_speed")

	if mod then
		stack = mod:GetStackCount()
	end

	self.parent:UpdateUIlong({ stack = stack, max = self.ability.talents.q7_max, style = "WitchDoctorCask" })
end

modifier_witch_doctor_paralyzing_cask_custom_legendary_speed = class(mod_hidden)
function modifier_witch_doctor_paralyzing_cask_custom_legendary_speed:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.q7_max
	self.duration = self.ability.talents.q7_duration
	self.speed = self.ability.talents.q7_speed
	self.radius = self.ability.talents.q7_radius

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true
	self:StartIntervalThink(0.5)
	self:OnRefresh()
end

function modifier_witch_doctor_paralyzing_cask_custom_legendary_speed:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	if self:GetStackCount() >= self.max then
		self.parent:EmitSound("WD.Voodoo_health_max")
		self.parent:GenericParticle("particles/units/heroes/hero_lina/lina_supercharge_buff.vpcf", self)
	end

	self.ability.tracker:UpdateUI()
end

function modifier_witch_doctor_paralyzing_cask_custom_legendary_speed:OnIntervalThink()
	if not IsServer() then
		return
	end
	local targets = FindUnitsInRadius(
		self.parent:GetTeamNumber(),
		self.parent:GetAbsOrigin(),
		nil,
		self.radius,
		DOTA_UNIT_TARGET_TEAM_ENEMY,
		DOTA_UNIT_TARGET_HERO,
		DOTA_UNIT_TARGET_FLAG_INVULNERABLE + DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE,
		FIND_CLOSEST,
		false
	)

	if #targets > 0 then
		self:SetDuration(self.duration, true)
	end
end

function modifier_witch_doctor_paralyzing_cask_custom_legendary_speed:OnDestroy()
	if not IsServer() then
		return
	end
	self:SetStackCount(0)
	self.ability.tracker:UpdateUI()
end

function modifier_witch_doctor_paralyzing_cask_custom_legendary_speed:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_witch_doctor_paralyzing_cask_custom_legendary_speed:GetModifierAttackSpeedBonus_Constant()
	return self.speed * self:GetStackCount()
end

modifier_witch_doctor_paralyzing_cask_custom_poison = class(mod_visible)
function modifier_witch_doctor_paralyzing_cask_custom_poison:GetTexture()
	return "buffs/witch_doctor/cask_3"
end
function modifier_witch_doctor_paralyzing_cask_custom_poison:OnCreated(table)
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()

	self.heal = self.ability.talents.q3_heal
	self.interval = self.ability.talents.q3_interval
	self.duration = self.ability.talents.q3_duration

	self.damageTable = {
		victim = self.parent,
		attacker = self.caster,
		ability = self.ability,
		damage_type = self.ability.talents.q3_damage_type,
	}

	if not IsServer() then
		return
	end
	self.RemoveForDuel = true

	for i = 1, 2 do
		self.parent:GenericParticle("particles/units/heroes/hero_venomancer/venomancer_poison_debuff.vpcf", self)
	end

	self.count = 0
	self:OnRefresh()
	self:StartIntervalThink(self.interval)
end

function modifier_witch_doctor_paralyzing_cask_custom_poison:OnRefresh()
	if not IsServer() then
		return
	end
	self.parent:EmitSound("WD.Cask_poison")

	self.particle = ParticleManager:CreateParticle(
		"particles/alchemist/weaponry_proc.vpcf",
		PATTACH_CUSTOMORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		self.particle,
		3,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(self.particle)

	self:IncrementStackCount()
	Timers:CreateTimer(self.duration, function()
		if IsValid(self) then
			self:DecrementStackCount()
			if self:GetStackCount() <= 0 then
				self:Destroy()
			end
		end
	end)

	self.count = self.duration
end

function modifier_witch_doctor_paralyzing_cask_custom_poison:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.damageTable.damage = (
		(self.ability.talents.q3_base + self.ability.talents.q3_damage * self.caster:GetAverageTrueAttackDamage(nil))
		* self.interval
		/ self.duration
	) * self:GetStackCount()
	local real_damage = DoDamage(self.damageTable, "modifier_witch_doctor_cask_3")
	self.parent:SendNumber(9, real_damage)

	local result = self.caster:CanLifesteal(self.parent)
	if result then
		self.caster:GenericHeal(
			result * self.heal * real_damage,
			self.ability,
			true,
			"particles/items3_fx/octarine_core_lifesteal.vpcf",
			"modifier_witch_doctor_cask_3"
		)
	end

	self.count = self.count - 1
	if self.count <= 0 then
		self:Destroy()
		return
	end
end

modifier_witch_doctor_paralyzing_cask_custom_slow = class(mod_hidden)
function modifier_witch_doctor_paralyzing_cask_custom_slow:IsPurgable()
	return true
end
function modifier_witch_doctor_paralyzing_cask_custom_slow:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()
	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/units/heroes/hero_marci/marci_rebound_bounce_impact_debuff.vpcf", self)
end

function modifier_witch_doctor_paralyzing_cask_custom_slow:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_witch_doctor_paralyzing_cask_custom_slow:GetModifierMoveSpeedBonus_Percentage()
	return self.ability.talents.q2_slow
end

modifier_witch_doctor_paralyzing_cask_custom_legendary_cd = class(mod_cd)

modifier_witch_doctor_paralyzing_cask_custom_auto_cd = class(mod_cd)
function modifier_witch_doctor_paralyzing_cask_custom_auto_cd:GetTexture()
	return "buffs/witch_doctor/cask_4"
end

modifier_witch_doctor_paralyzing_cask_custom_root = class(mod_hidden)
function modifier_witch_doctor_paralyzing_cask_custom_root:IsPurgable()
	return true
end
function modifier_witch_doctor_paralyzing_cask_custom_root:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/witch_doctor/ward_root.vpcf", self)
	self.parent:EmitSound("WD.Ward_root")
end

function modifier_witch_doctor_paralyzing_cask_custom_root:CheckState()
	return {
		[MODIFIER_STATE_ROOTED] = true,
	}
end

modifier_witch_doctor_paralyzing_cask_custom_root_cd = class(mod_hidden)