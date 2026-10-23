--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_custom_juggernaut_healing_ward",
	"abilities/juggernaut/custom_juggernaut_healing_ward.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_healing_ward_aura",
	"abilities/juggernaut/custom_juggernaut_healing_ward.lua",
	LUA_MODIFIER_MOTION_NONE,
	true
)
LinkLuaModifier(
	"modifier_custom_juggernaut_healing_ward_invun",
	"abilities/juggernaut/custom_juggernaut_healing_ward.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_healing_ward_tracker",
	"abilities/juggernaut/custom_juggernaut_healing_ward.lua",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_custom_juggernaut_healing_ward_bonus",
	"abilities/juggernaut/custom_juggernaut_healing_ward.lua",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_juggernaut_hero_2"
)
LinkLuaModifier(
	"modifier_custom_juggernaut_healing_ward_legendary_knock_cd",
	"abilities/juggernaut/custom_juggernaut_healing_ward.lua",
	LUA_MODIFIER_MOTION_NONE
)

custom_juggernaut_healing_ward = class({})
custom_juggernaut_healing_ward.talents = {}

function custom_juggernaut_healing_ward:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/juggernaut/ward_legendary.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_juggernaut/juggernaut_healing_ward.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/ward_bolt.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/ward_exlosion.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_oracle/oracle_false_promise_heal.vpcf", context)
	PrecacheResource("particle", "particles/items2_fx/refresher.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/ward_immune.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/ward_burn.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/jugger_ward_legend.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/ward_invun.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/ward_bolt_damage.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/ward_leash.vpcf", context)
	PrecacheResource("particle", "particles/juggernaut/ward_radius.vpcf", context)
end

function custom_juggernaut_healing_ward:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true
		self.talents = {
			w1_spell = 0,
			w1_damage = 0,

			w2_cd = 0,
			w2_duration = 0,
			w2_duration_legendary = 0,

			has_w3 = 0,
			w3_damage = 0,
			w3_heal = caster:GetTalentValue("modifier_juggernaut_healingward_3", "heal", true) / 100,
			w3_chance = caster:GetTalentValue("modifier_juggernaut_healingward_3", "chance", true),
			w3_chance_fury = caster:GetTalentValue("modifier_juggernaut_healingward_3", "chance_fury", true),

			has_w4 = 0,
			w4_cd_items = caster:GetTalentValue("modifier_juggernaut_healingward_4", "cd_items", true) / 100,
			w4_mana = caster:GetTalentValue("modifier_juggernaut_healingward_4", "mana", true),
			w4_cdr = caster:GetTalentValue("modifier_juggernaut_healingward_4", "cdr", true),

			has_w7 = 0,
			w7_cd_inc = caster:GetTalentValue("modifier_juggernaut_healingward_7", "cd_inc", true) / 100,
			w7_damage = caster:GetTalentValue("modifier_juggernaut_healingward_7", "damage", true) / 100,
			w7_duration = caster:GetTalentValue("modifier_juggernaut_healingward_7", "duration", true),
			w7_damage_type = caster:GetTalentValue("modifier_juggernaut_healingward_7", "damage_type", true),

			has_q3 = 0,
			q3_duration = caster:GetTalentValue("modifier_juggernaut_bladefury_3", "duration", true),

			has_h2 = 0,
			h2_magic = 0,
			h2_status = 0,
			h2_bonus = caster:GetTalentValue("modifier_juggernaut_hero_2", "bonus", true),
			h2_duration = caster:GetTalentValue("modifier_juggernaut_hero_2", "duration", true),

			has_h5 = 0,
			h5_stun = caster:GetTalentValue("modifier_juggernaut_hero_5", "stun", true),
			h5_heal = caster:GetTalentValue("modifier_juggernaut_hero_5", "heal", true),
			h5_invun_legendary = caster:GetTalentValue("modifier_juggernaut_hero_5", "invun_legendary", true),
			h5_invun = caster:GetTalentValue("modifier_juggernaut_hero_5", "invun", true),
		}
	end

	if caster:HasTalent("modifier_juggernaut_healingward_1") then
		self.talents.w1_damage = caster:GetTalentValue("modifier_juggernaut_healingward_1", "damage") / 100
		self.talents.w1_spell = caster:GetTalentValue("modifier_juggernaut_healingward_1", "spell")
	end

	if caster:HasTalent("modifier_juggernaut_healingward_2") then
		self.talents.w2_cd = caster:GetTalentValue("modifier_juggernaut_healingward_2", "cd")
		self.talents.w2_duration = caster:GetTalentValue("modifier_juggernaut_healingward_2", "duration")
		self.talents.w2_duration_legendary =
			caster:GetTalentValue("modifier_juggernaut_healingward_2", "duration_legendary")
	end

	if caster:HasTalent("modifier_juggernaut_healingward_3") then
		self.talents.has_w3 = 1
		self.talents.w3_damage = caster:GetTalentValue("modifier_juggernaut_healingward_3", "damage") / 100
	end

	if caster:HasTalent("modifier_juggernaut_healingward_4") then
		self.talents.has_w4 = 1
	end

	if caster:HasTalent("modifier_juggernaut_healingward_7") then
		self.talents.has_w7 = 1
	end

	if caster:HasTalent("modifier_juggernaut_bladefury_3") then
		self.talents.has_q3 = 1
	end

	if caster:HasTalent("modifier_juggernaut_hero_2") then
		self.talents.has_h2 = 1
		self.talents.h2_magic = caster:GetTalentValue("modifier_juggernaut_hero_2", "magic")
		self.talents.h2_status = caster:GetTalentValue("modifier_juggernaut_hero_2", "status")
	end

	if caster:HasTalent("modifier_juggernaut_hero_5") then
		self.talents.has_h5 = 1
	end
end

function custom_juggernaut_healing_ward:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "juggernaut_healing_ward", self)
end

function custom_juggernaut_healing_ward:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_custom_juggernaut_healing_ward_tracker"
end

function custom_juggernaut_healing_ward:GetAOERadius()
	return self.radius or 0
end

function custom_juggernaut_healing_ward:GetCooldown(iLevel)
	local k = self.talents.has_w7 == 1 and (1 + self.talents.w7_cd_inc) or 1
	return (self.BaseClass.GetCooldown(self, iLevel) + (self.talents.w2_cd or 0)) * k
end

function custom_juggernaut_healing_ward:GetDamage()
	return self.damage + self.caster:GetMaxHealth() * self.talents.w1_damage
end

function custom_juggernaut_healing_ward:OnSpellStart()
	local duration = self.duration + self.talents.w2_duration
	local point = self:GetCursorPosition()

	if self.talents.has_w7 == 1 then
		duration = self.talents.w7_duration + self.talents.w2_duration_legendary
	end

	self.ward =
		CreateUnitByName("juggernaut_healing_ward", point, true, self.caster, self.caster, self.caster:GetTeamNumber())
	self.ward:AddNewModifier(self.caster, self, "modifier_kill", { duration = duration })
	self.ward.owner = self.caster

	if self.talents.has_w7 == 0 then
		self.ward:SetControllableByPlayer(self.caster:GetPlayerOwnerID(), true)
		Timers:CreateTimer(0.05, function()
			self.ward:MoveToNPC(self.caster)
		end)
	end

	self.ward:AddNewModifier(self.caster, self, "modifier_custom_juggernaut_healing_ward", { duration = duration })
end

function custom_juggernaut_healing_ward:ProcDamage(target, is_fury, is_proc)
	if not IsServer() then
		return
	end
	if not self:IsTrained() then
		return
	end
	if self.talents.has_w3 == 0 then
		return
	end

	if not is_proc then
		local chance = self.talents.w3_chance
		local index = 8950
		if is_fury then
			index = 8951
			chance = self.talents.w3_chance_fury
		end
		if not RollPseudoRandomPercentage(chance, index, self.caster) then
			return
		end
	end

	local real_damage = DoDamage(
		{
			attacker = self.caster,
			ability = self,
			victim = target,
			damage_type = DAMAGE_TYPE_MAGICAL,
			damage = self:GetDamage() * self.talents.w3_damage,
		},
		"modifier_juggernaut_healingward_3"
	)
	target:SendNumber(4, real_damage)
	local result = self.caster:CanLifesteal(target)
	if result then
		self.caster:GenericHeal(
			self.talents.w3_heal * real_damage * result,
			self,
			true,
			"",
			"modifier_juggernaut_healingward_3"
		)
	end

	target:EmitSound("Juggernaut.Ward_damage")
	target:GenericParticle("particles/juggernaut/ward_bolt_damage.vpcf")
end

modifier_custom_juggernaut_healing_ward = class(mod_hidden)
function modifier_custom_juggernaut_healing_ward:IsAura()
	return IsServer() and self.parent:IsAlive()
end
function modifier_custom_juggernaut_healing_ward:GetAuraDuration()
	return self.aura_duration
end
function modifier_custom_juggernaut_healing_ward:GetAuraRadius()
	return self.radius
end
function modifier_custom_juggernaut_healing_ward:GetAuraSearchTeam()
	return DOTA_UNIT_TARGET_TEAM_BOTH
end
function modifier_custom_juggernaut_healing_ward:GetAuraSearchType()
	return DOTA_UNIT_TARGET_BASIC + DOTA_UNIT_TARGET_HERO
end
function modifier_custom_juggernaut_healing_ward:GetModifierAura()
	return "modifier_custom_juggernaut_healing_ward_aura"
end
function modifier_custom_juggernaut_healing_ward:OnCreated(table)
	self.caster = self:GetCaster()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.base_move = self.ability.move
	self.health = self.ability.health
	self.radius = self.ability.radius
	self.aura_duration = self.ability.aura_duration

	if not IsServer() then
		return
	end

	self.ability:EndCd()
	self.parent:AddAttackEvent_inc(self, true)

	if self.ability.talents.has_h5 == 1 then
		local duration = self.ability.talents.has_w7 == 1 and self.ability.talents.h5_invun_legendary
			or self.ability.talents.h5_invun
		self.parent:AddNewModifier(
			self.caster,
			self.ability,
			"modifier_custom_juggernaut_healing_ward_invun",
			{ duration = duration }
		)
	end

	local model_scale = 1
	local sound_cast = wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.HealingWard.Cast", self)
	self.sound = wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.HealingWard.Loop", self)
	self.sound_stop = wearables_system:GetSoundReplacement(self.caster, "Hero_Juggernaut.HealingWard.Stop", self)

	local particle_fx = wearables_system:GetParticleReplacementAbility(
		self.caster,
		"particles/units/heroes/hero_juggernaut/juggernaut_healing_ward.vpcf",
		self
	)
	local model_name = wearables_system:GetUnitModelReplacement(self.caster, "npc_dota_juggernaut_healing_ward")
	if model_name then
		self.parent:SetModel(model_name)
		self.parent:SetOriginalModel(model_name)
	end
	if model_name and model_name == "models/items/juggernaut/ward/fortunes_tout/fortunes_tout.vmdl" then
		model_scale = 0.85
		if
			particle_fx
			== "particles/econ/items/juggernaut/jugg_fortunes_tout/jugg_healing_ward_fortunes_tout_gold.vpcf"
		then
			self.parent:SetMaterialGroup("1")
		end
		local vector = Vector(0, -1, 0)
		self.parent:FacePoint(self.parent:GetAbsOrigin() + vector * 10)
	end
	if model_name and model_name == "models/items/juggernaut/ward/miyamoto_musash_ward/miyamoto_musash_ward.vmdl" then
		self.parent:SetMaterialGroup("1")
		if self.caster:HasUnequipItem(7999) then
			self.parent:SetMaterialGroup("2")
		end
	end

	self.ward_particle = ParticleManager:CreateParticle(particle_fx, PATTACH_ABSORIGIN_FOLLOW, self.parent)
	ParticleManager:SetParticleControl(self.ward_particle, 0, self.parent:GetAbsOrigin())
	ParticleManager:SetParticleControl(self.ward_particle, 1, Vector(self.radius, 1, 1))
	ParticleManager:SetParticleControlEnt(
		self.ward_particle,
		2,
		self.parent,
		PATTACH_POINT_FOLLOW,
		"flame_attachment",
		self.parent:GetAbsOrigin(),
		true
	)
	self:AddParticle(self.ward_particle, false, false, -1, false, false)

	self.inside_targets = {}
	self.damage_stack = 0

	if self.ability.talents.has_w7 == 1 then
		model_scale = model_scale * 1.6
		self.parent:SetHealthBarOffsetOverride(250)
		local effect_cast = ParticleManager:CreateParticle(
			"particles/juggernaut/ward_legendary.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(self.radius, 0, 1))
		ParticleManager:SetParticleControl(effect_cast, 2, Vector(self:GetRemainingTime(), 0, 1))
		self:AddParticle(effect_cast, false, false, -1, false, false)

		for _, target in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
			self.inside_targets[target] = true

			local effect_cast =
				ParticleManager:CreateParticle("particles/juggernaut/ward_leash.vpcf", PATTACH_ABSORIGIN, self.parent)
			ParticleManager:SetParticleControlEnt(
				effect_cast,
				0,
				self.parent,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				self.parent:GetOrigin(),
				true
			)
			ParticleManager:SetParticleControlEnt(
				effect_cast,
				1,
				target,
				PATTACH_POINT_FOLLOW,
				"attach_hitloc",
				target:GetOrigin(),
				true
			)
			self:AddParticle(effect_cast, false, false, -1, false, false)
		end

		self.caster:AddLifesteal(self, {
			name = "modifier_juggernaut_healingward_7",
			type = 1,
			heal = false,
			proc = "LifestealDamage",
			value = function()
				if (self.caster:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.radius then
					return 0
				end
				return self.ability.talents.w7_damage
			end,
		})
	elseif self.caster:HasScepter() then
		self.radius_visual = ParticleManager:CreateParticle(
			"particles/juggernaut/ward_radius.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(self.radius_visual, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(self.radius_visual, 1, Vector(self.radius, 0, 0))
		self:AddParticle(self.radius_visual, false, false, -1, false, false)
	end

	self.parent:SetModelScale(model_scale)
	self.parent:EmitSound(self.sound)
	self.parent:EmitSound(sound_cast)

	self.time = self:GetRemainingTime()
	self.interval = 0.1
	self.damage_count = 0

	self.damageTable = { attacker = self.caster, ability = self.ability, damage_type = DAMAGE_TYPE_MAGICAL }

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_custom_juggernaut_healing_ward:OnIntervalThink()
	if not IsServer() then
		return
	end

	self.damage_count = self.damage_count + self.interval
	if self.damage_count >= self.ability.interval then
		self.damage_count = 0
		self.damageTable.damage = self.ability:GetDamage() * self.ability.interval
		local target_hit = nil

		for _, target in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
			if not target_hit or (target_hit:IsCreep() and target:IsHero()) then
				target_hit = target
			end
			self.damageTable.victim = target
			DoDamage(self.damageTable)

			self.ability:ProcDamage(target)

			if self.ability.talents.has_q3 == 1 and IsValid(self.caster.fury_ability) then
				target:AddNewModifier(
					self.caster,
					self.caster.fury_ability,
					"modifier_custom_juggernaut_blade_fury_resist",
					{ duration = self.ability.talents.q3_duration }
				)
			end
		end

		if target_hit and IsValid(self.caster.bladeform_ability) then
			self.caster.bladeform_ability:AddStack(target_hit, 1)
		end
	end

	if self.ability.talents.has_w7 == 0 then
		return
	end

	for target, _ in pairs(self.inside_targets) do
		if IsValid(target) and target:IsAlive() then
			local radius = self.radius * 0.9
			local dir = (target:GetAbsOrigin() - self.parent:GetAbsOrigin())

			if not target:IsInvulnerable() and dir:Length2D() > radius then
				target:InterruptMotionControllers(false)
				local point = self.parent:GetAbsOrigin() + dir:Normalized() * (radius * 0.8)
				if dir:Length2D() > radius * 1.4 then
					FindClearSpaceForUnit(target, point, true)
				else
					self:ChangePos(target, point)
				end
			end

			if target:IsRealHero() then
				AddFOWViewer(target:GetTeamNumber(), self.parent:GetAbsOrigin(), 50, self.interval * 2, false)
			end
		else
			self.inside_targets[target] = nil
		end
	end

	for _, target in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
		if
			not self.inside_targets[target]
			and not target:HasModifier("modifier_custom_juggernaut_healing_ward_legendary_knock_cd")
		then
			local dir = target:GetAbsOrigin() - self.parent:GetAbsOrigin()
			local point = self.parent:GetAbsOrigin() + dir:Normalized() * self.radius * 1.2

			target:InterruptMotionControllers(false)
			target:AddNewModifier(
				target,
				nil,
				"modifier_custom_juggernaut_healing_ward_legendary_knock_cd",
				{ duration = 0.2 }
			)
			self:ChangePos(target, point)
		end
	end

	self.caster:UpdateUIshort({
		max_time = self.time,
		time = self:GetRemainingTime(),
		stack = self.damage_stack,
		style = "JuggernautWard",
	})
end

function modifier_custom_juggernaut_healing_ward:ChangePos(target, point)
	if not IsServer() then
		return
	end

	target:EmitSound("Juggernaut.Ward_knock")
	local duration = 0.2
	local distance = (target:GetAbsOrigin() - point):Length2D()
	local knockbackProperties = {
		target_x = point.x,
		target_y = point.y,
		distance = distance,
		speed = distance / duration,
		height = 0,
		fix_end = true,
		isStun = true,
		activity = ACT_DOTA_FLAIL,
	}
	target:AddNewModifier(self.caster, self.caster:BkbAbility(nil, true), "modifier_generic_arc", knockbackProperties)
end

function modifier_custom_juggernaut_healing_ward:OnDestroy()
	if not IsServer() then
		return
	end

	self.caster:UpdateUIshort({ hide = 1, hide_full = 1, style = "JuggernautWard" })

	self.parent:EmitSound(self.sound_stop)
	self.parent:StopSound(self.sound)

	if self.caster:HasModifier("modifier_juggernaut_fall_ward") then
		local death_particle = ParticleManager:CreateParticle(
			"particles/econ/items/juggernaut/jugg_fall20_immortal/jugg_fall20_immortal_healing_ward_death.vpcf",
			PATTACH_WORLDORIGIN,
			self.parent
		)
		ParticleManager:SetParticleControl(death_particle, 0, self.parent:GetAbsOrigin())
		ParticleManager:ReleaseParticleIndex(death_particle)
	end

	self.ability:StartCd()

	if self.ability.talents.has_h5 == 1 or self.ability.talents.has_w7 == 1 then
		local particle =
			ParticleManager:CreateParticle("particles/juggernaut/ward_exlosion.vpcf", PATTACH_WORLDORIGIN, nil)
		ParticleManager:SetParticleControl(particle, 0, self.parent:GetAbsOrigin())
		ParticleManager:SetParticleControl(particle, 1, Vector(self.radius, 1, 1))
		ParticleManager:ReleaseParticleIndex(particle)

		local damageTable = {
			attacker = self.caster,
			damage = self.damage_stack,
			damage_type = self.ability.talents.w7_damage_type,
			ability = self.ability,
		}

		self.parent:EmitSound("Juggernaut.WardDeath")
		self.parent:EmitSound("Juggernaut.WardDeath_2")

		for _, target in pairs(self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())) do
			local dir = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
			local distance = 150
			local point = target:GetAbsOrigin() + dir * distance

			target:AddNewModifier(self.caster, self.ability, "modifier_generic_arc", {
				target_x = point.x,
				target_y = point.y,
				distance = distance,
				duration = 0.2,
				height = 50,
				fix_end = false,
				isStun = false,
				activity = ACT_DOTA_FLAIL,
			})

			if self.ability.talents.has_w7 == 1 then
				damageTable.victim = target
				local real_damage = DoDamage(damageTable, "modifier_juggernaut_healingward_7")
				target:SendNumber(6, real_damage)
			end

			if self.ability.talents.has_h5 == 1 then
				target:AddNewModifier(
					self.caster,
					self.ability,
					"modifier_stunned",
					{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.h5_stun }
				)
			end
			target:GenericParticle("particles/units/heroes/hero_oracle/oracle_false_promise_heal.vpcf")
		end
	end
end

function modifier_custom_juggernaut_healing_ward:LifestealDamage(params, damage, target, real_heal, result)
	self.damage_stack = self.damage_stack + result * params.original_damage * self.ability.talents.w7_damage
end

function modifier_custom_juggernaut_healing_ward:AttackEvent_inc(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.target then
		return
	end

	local attacker = params.attacker
	if attacker:IsIllusion() then
		return
	end
	if attacker:IsCreep() and attacker.owner and attacker:GetTeamNumber() ~= DOTA_TEAM_CUSTOM_5 then
		return
	end

	if self.caster:HasScepter() and (attacker:GetAbsOrigin() - self.parent:GetAbsOrigin()):Length2D() > self.radius then
		self.parent:EmitSound("Juggernaut.Ward_immune")
		local effect_cast = ParticleManager:CreateParticle(
			"particles/juggernaut/ward_immune.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			self.parent
		)
		ParticleManager:SetParticleControl(effect_cast, 0, self.parent:GetOrigin())
		ParticleManager:SetParticleControl(effect_cast, 1, Vector(100, 0, 0))
		ParticleManager:ReleaseParticleIndex(effect_cast)
		return
	end

	self.health = self.health - 1

	if self.ability.talents.has_w3 == 1 then
		local targets = self.caster:FindTargets(self.radius, self.parent:GetAbsOrigin())
		local targets_hit = {}
		table.insert(targets, attacker)

		for _, target in pairs(targets) do
			if not targets_hit[target] then
				targets_hit[target] = true
				local item_effect = ParticleManager:CreateParticle(
					"particles/juggernaut/ward_bolt.vpcf",
					PATTACH_ABSORIGIN_FOLLOW,
					self.parent
				)
				ParticleManager:SetParticleControlEnt(
					item_effect,
					0,
					self.parent,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					self.parent:GetOrigin(),
					true
				)
				ParticleManager:SetParticleControlEnt(
					item_effect,
					1,
					target,
					PATTACH_POINT_FOLLOW,
					"attach_hitloc",
					target:GetOrigin(),
					true
				)
				ParticleManager:ReleaseParticleIndex(item_effect)
				self.ability:ProcDamage(target, nil, true)
			end
		end
	end

	if self.health <= 0 then
		self.parent:Kill(nil, attacker)
	else
		self.parent:SetHealth(self.health)
	end
end

function modifier_custom_juggernaut_healing_ward:CheckState()
	if self.ability.talents.has_w7 == 1 then
		return {
			[MODIFIER_STATE_LOW_ATTACK_PRIORITY] = true,
			[MODIFIER_STATE_STUNNED] = true,
			[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
			[MODIFIER_STATE_ROOTED] = true,
		}
	end

	return {
		[MODIFIER_STATE_LOW_ATTACK_PRIORITY] = true,
		[MODIFIER_STATE_NO_UNIT_COLLISION] = true,
	}
end

function modifier_custom_juggernaut_healing_ward:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
		MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE,
		MODIFIER_PROPERTY_DISABLE_TURNING,
		MODIFIER_PROPERTY_HEALTHBAR_PIPS,
	}
end

function modifier_custom_juggernaut_healing_ward:GetAbsoluteNoDamageMagical()
	return 1
end

function modifier_custom_juggernaut_healing_ward:GetAbsoluteNoDamagePhysical()
	return 1
end

function modifier_custom_juggernaut_healing_ward:GetAbsoluteNoDamagePure()
	return 1
end

function modifier_custom_juggernaut_healing_ward:GetModifierDisableTurning()
	if self.ability.talents.has_w7 == 0 then
		return
	end
	return 1
end

function modifier_custom_juggernaut_healing_ward:GetModifierMoveSpeed_Absolute()
	return self.base_move
end

function modifier_custom_juggernaut_healing_ward:GetModifierHealthBarPips()
	return self.health
end

modifier_custom_juggernaut_healing_ward_aura = class(mod_visible)
function modifier_custom_juggernaut_healing_ward_aura:OnCreated(table)
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.has_scepter = self.caster:HasScepter()
	self.scepter_speed = self.ability.scepter_speed
	self.is_enemy = self.parent:GetTeamNumber() ~= self.caster:GetTeamNumber()
	self.health_regen = self.ability.health_regen
		+ (self.ability.talents.has_h5 == 1 and self.ability.talents.h5_heal or 0)

	if not IsServer() then
		return
	end
	if self.is_enemy then
		self.parent:GenericParticle("particles/juggernaut/ward_burn.vpcf", self)
	elseif self.parent == self.caster then
		if self.has_scepter then
			self.parent:GenericParticle("particles/juggernaut/jugger_ward_legend.vpcf", self)
		end
		if self.ability.talents.has_w4 == 1 then
			self.interval = 0.5
			self:StartIntervalThink(self.interval)
		end
	end
end

function modifier_custom_juggernaut_healing_ward_aura:OnIntervalThink()
	if not IsServer() then
		return
	end
	self.parent:CdItems(self.interval * self.ability.talents.w4_cd_items, "modifier_juggernaut_healingward_4")
end

function modifier_custom_juggernaut_healing_ward_aura:OnDestroy()
	if not IsServer() then
		return
	end
	if self.is_enemy then
		return
	end
	if self.ability.talents.has_h2 == 0 then
		return
	end

	self.parent:AddNewModifier(
		self.parent,
		self.ability,
		"modifier_custom_juggernaut_healing_ward_bonus",
		{ duration = self.ability.talents.h2_duration }
	)
end

function modifier_custom_juggernaut_healing_ward_aura:CheckState()
	if self.ability.talents.has_w7 == 0 then
		return
	end
	if not self.is_enemy then
		return
	end
	return {
		[MODIFIER_STATE_TETHERED] = true,
	}
end

function modifier_custom_juggernaut_healing_ward_aura:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MIN_HEALTH,
		MODIFIER_PROPERTY_HEALTH_REGEN_PERCENTAGE,
		MODIFIER_PROPERTY_MANA_REGEN_TOTAL_PERCENTAGE,
		MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
	}
end

function modifier_custom_juggernaut_healing_ward_aura:GetMinHealth()
	if self.is_enemy then
		return
	end
	if not self.has_scepter then
		return
	end
	if self.caster ~= self.parent then
		return
	end
	if self.parent:HasModifier("modifier_death") then
		return
	end
	if self.parent:HasModifier("modifier_tower_incoming_speed") then
		return
	end

	return self.parent:GetMaxHealth() * self.ability.scepter_health
end

function modifier_custom_juggernaut_healing_ward_aura:GetModifierAttackSpeedBonus_Constant()
	if not self.is_enemy then
		return
	end
	if not self.has_scepter then
		return
	end
	return self.scepter_speed
end

function modifier_custom_juggernaut_healing_ward_aura:GetModifierHealthRegenPercentage()
	if self.is_enemy then
		return
	end
	return self.health_regen
end

function modifier_custom_juggernaut_healing_ward_aura:GetModifierTotalPercentageManaRegen()
	if self.is_enemy then
		return
	end
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_mana
end

modifier_custom_juggernaut_healing_ward_invun = class(mod_hidden)
function modifier_custom_juggernaut_healing_ward_invun:GetEffectName()
	return "particles/juggernaut/ward_invun.vpcf"
end
function modifier_custom_juggernaut_healing_ward_invun:CheckState()
	return {
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

modifier_custom_juggernaut_healing_ward_tracker = class(mod_hidden)
function modifier_custom_juggernaut_healing_ward_tracker:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.parent.healing_ward_ability = self.ability

	self.ability.health_regen = self.ability:GetSpecialValueFor("health_regen")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
	self.ability.interval = self.ability:GetSpecialValueFor("interval")
	self.ability.radius = self.ability:GetSpecialValueFor("radius")
	self.ability.duration = self.ability:GetSpecialValueFor("duration")
	self.ability.health = self.ability:GetSpecialValueFor("health")
	self.ability.move = self.ability:GetSpecialValueFor("move")
	self.ability.aura_duration = self.ability:GetSpecialValueFor("aura_duration")
	self.ability.scepter_speed = self.ability:GetSpecialValueFor("scepter_speed")
	self.ability.scepter_health = self.ability:GetSpecialValueFor("scepter_health") / 100
end

function modifier_custom_juggernaut_healing_ward_tracker:OnRefresh(table)
	self.ability.health_regen = self.ability:GetSpecialValueFor("health_regen")
	self.ability.damage = self.ability:GetSpecialValueFor("damage")
end

function modifier_custom_juggernaut_healing_ward_tracker:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
		MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
		MODIFIER_PROPERTY_STATUS_RESISTANCE_STACKING,
		MODIFIER_PROPERTY_COOLDOWN_PERCENTAGE,
	}
end

function modifier_custom_juggernaut_healing_ward_tracker:GetModifierPercentageCooldown()
	if self.ability.talents.has_w4 == 0 then
		return
	end
	return self.ability.talents.w4_cdr
end

function modifier_custom_juggernaut_healing_ward_tracker:GetModifierSpellAmplify_Percentage()
	return self.ability.talents.w1_spell
end

function modifier_custom_juggernaut_healing_ward_tracker:GetModifierStatusResistanceStacking()
	return self.ability.talents.h2_status
		* (
			(
					self.parent:HasModifier("modifier_custom_juggernaut_healing_ward_bonus")
					or self.parent:HasModifier("modifier_custom_juggernaut_healing_ward_aura")
				)
				and self.ability.talents.h2_bonus
			or 1
		)
end

function modifier_custom_juggernaut_healing_ward_tracker:GetModifierMagicalResistanceBonus()
	return self.ability.talents.h2_magic
		* (
			(
					self.parent:HasModifier("modifier_custom_juggernaut_healing_ward_bonus")
					or self.parent:HasModifier("modifier_custom_juggernaut_healing_ward_aura")
				)
				and self.ability.talents.h2_bonus
			or 1
		)
end

modifier_custom_juggernaut_healing_ward_bonus = class(mod_hidden)
modifier_custom_juggernaut_healing_ward_legendary_knock_cd = class(mod_hidden)