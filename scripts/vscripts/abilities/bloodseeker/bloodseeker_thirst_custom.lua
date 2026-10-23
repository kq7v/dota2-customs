--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_debuff",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_visual",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_kill",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_vision",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bloodseeker_hero_5"
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_cdr",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bloodseeker_hero_5"
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_legendary_dash",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_HORIZONTAL
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_legendary_attack",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_legendary_attack_damage",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_unmiss",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bloodseeker_thirst_4"
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_bash_cd",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE,
	"modifier_bloodseeker_thirst_4"
)
LinkLuaModifier(
	"modifier_bloodseeker_thirst_custom_crit_count",
	"abilities/bloodseeker/bloodseeker_thirst_custom",
	LUA_MODIFIER_MOTION_NONE
)

bloodseeker_thirst_custom = class({})
bloodseeker_thirst_custom.talents = {}

function bloodseeker_thirst_custom:Precache(context)
	if self:GetCaster() and self:GetCaster():IsIllusion() then
		return
	end

	PrecacheResource("particle", "particles/bloodseeker/thirst_cleave.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_centaur/centaur_double_edge.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_thirst_vision.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf", context)
	PrecacheResource("particle", "particles/items4_fx/ascetic_cap.vpcf", context)
	PrecacheResource("particle", "particles/status_fx/status_effect_gods_strength.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_legendary.vpcf", context)
	PrecacheResource("particle", "particles/bristleback/brist_lowhp_.vpcf", context)
	PrecacheResource("particle", "particles/units/heroes/hero_bloodseeker/bloodseeker_vision.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_crit.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_dash_damage.vpcf", context)
	PrecacheResource("particle", "particles/bloodseeker/thirst_dash.vpcf", context)
end

function bloodseeker_thirst_custom:UpdateTalents()
	local caster = self:GetCaster()
	if not self.init then
		self.init = true

		self.talents = {
			e1_damage = 0,
			e1_max = caster:GetTalentValue("modifier_bloodseeker_thirst_1", "max", true),

			has_e2 = 0,
			e2_move = 0,
			e2_cleave = 0,

			has_e3 = 0,
			e3_heal = 0,
			e3_damage = 0,
			e3_count = caster:GetTalentValue("modifier_bloodseeker_thirst_3", "count", true),
			e3_health = caster:GetTalentValue("modifier_bloodseeker_thirst_3", "health", true),
			e3_count_inc = caster:GetTalentValue("modifier_bloodseeker_thirst_3", "count_inc", true),
			e3_duration = caster:GetTalentValue("modifier_bloodseeker_thirst_3", "duration", true),

			has_e4 = 0,
			e4_thresh = caster:GetTalentValue("modifier_bloodseeker_thirst_4", "thresh", true),
			e4_health = caster:GetTalentValue("modifier_bloodseeker_thirst_4", "health", true),
			e4_stun = caster:GetTalentValue("modifier_bloodseeker_thirst_4", "stun", true),
			e4_talent_cd = caster:GetTalentValue("modifier_bloodseeker_thirst_4", "talent_cd", true),

			has_h5 = 0,
			h5_duration = caster:GetTalentValue("modifier_bloodseeker_hero_5", "duration", true),
			h5_damage = caster:GetTalentValue("modifier_bloodseeker_hero_5", "damage", true),
			h5_health = caster:GetTalentValue("modifier_bloodseeker_hero_5", "health", true),
			h5_max = caster:GetTalentValue("modifier_bloodseeker_hero_5", "max", true),
			h5_radius = caster:GetTalentValue("modifier_bloodseeker_hero_5", "radius", true),

			has_q7 = 0,

			has_e7 = 0,
			e7_talent_cd = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "talent_cd", true),
			e7_range = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "range", true),
			e7_min_range = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "min_range", true),
			e7_speed = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "speed", true),
			e7_damage = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "damage", true),
			e7_attacks = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "attacks", true),
			e7_attacks_creeps = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "attacks_creeps", true),
			e7_delay = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "delay", true),
			e7_cd_inc = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "cd_inc", true),
			e7_health = caster:GetTalentValue("modifier_bloodseeker_thirst_7", "health", true),
		}
	end

	if caster:HasTalent("modifier_bloodseeker_thirst_1") then
		self.talents.e1_damage = caster:GetTalentValue("modifier_bloodseeker_thirst_1", "damage") / 100
	end

	if caster:HasTalent("modifier_bloodseeker_thirst_2") then
		self.talents.has_e2 = 1
		self.talents.e2_move = caster:GetTalentValue("modifier_bloodseeker_thirst_2", "move")
		self.talents.e2_cleave = caster:GetTalentValue("modifier_bloodseeker_thirst_2", "cleave") / 100
		caster:AddProc(self.tracker, { land = true })
	end

	if caster:HasTalent("modifier_bloodseeker_thirst_3") then
		self.talents.has_e3 = 1
		self.talents.e3_heal = caster:GetTalentValue("modifier_bloodseeker_thirst_3", "heal") / 100
		self.talents.e3_damage = caster:GetTalentValue("modifier_bloodseeker_thirst_3", "damage")
		caster:AddProc(self.tracker, { name = "crit", damage = true, sync = true })
		caster:AddRecordDestroyEvent(self.tracker, true)
		caster:AddLifesteal(self.tracker, {
			name = "modifier_bloodseeker_thirst_3",
			type = 2,
			text = true,
			effect = "particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf",
			value = function(params)
				if not self.tracker.records[params.record] then
					return 0
				end
				return self.talents.e3_heal
			end,
		})
	end

	if caster:HasTalent("modifier_bloodseeker_thirst_4") then
		self.talents.has_e4 = 1
		caster:AddProc(self.tracker, { name = "bash", damage = true, sync = true })
		caster:AddAttackRecordEvent_out(self.tracker)
	end

	if caster:HasTalent("modifier_bloodseeker_hero_5") then
		self.talents.has_h5 = 1
		caster:AddDamageEvent_out(self.tracker)
		if IsServer() then
			caster:CalculateStatBonus(true)
		end
	end

	if caster:HasTalent("modifier_bloodseeker_bloodrage_7") then
		self.talents.has_q7 = 1
	end

	if caster:HasTalent("modifier_bloodseeker_thirst_7") then
		self.talents.has_e7 = 1
	end
end

function bloodseeker_thirst_custom:GetAbilityTextureName()
	return wearables_system:GetAbilityIconReplacement(self.caster, "bloodseeker_thirst", self)
end

function bloodseeker_thirst_custom:GetIntrinsicModifierName()
	if not self:GetCaster():IsRealHero() then
		return
	end
	return "modifier_bloodseeker_thirst_custom"
end

function bloodseeker_thirst_custom:GetCooldown(iLevel)
	if self.talents.has_e7 ~= 1 then
		return 0
	end
	return self.talents.e7_talent_cd
end

function bloodseeker_thirst_custom:GetBehavior()
	if self.talents.has_e7 == 1 then
		return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES
	end
	return DOTA_ABILITY_BEHAVIOR_PASSIVE
end

function bloodseeker_thirst_custom:GetCastAnimation()
	return ACT_DOTA_CAST_ABILITY_2
end

function bloodseeker_thirst_custom:GetCastRange(vector, hTarget)
	if self.talents.has_e7 ~= 1 then
		return 0
	end
	if IsServer() then
		return 99999
	end
	return self.talents.e7_range
end

function bloodseeker_thirst_custom:OnSpellStart()
	local point = self:GetCursorPosition()

	local dir = point - self.caster:GetAbsOrigin()
	local length = dir:Length2D()
	local direction = dir:Normalized()
	direction.z = 0

	local max_range = self.talents.e7_range + self.caster:GetCastRangeBonus()
	if length > max_range then
		point = self.caster:GetAbsOrigin() + max_range * direction
	elseif length < self.talents.e7_min_range then
		point = self.caster:GetAbsOrigin() + direction * self.talents.e7_min_range
	end

	self.caster:EmitSound("BS.Bloodrite_charge1")
	self.caster:EmitSound("BS.Bloodrite_charge2")
	self.caster:AddNewModifier(
		self.caster,
		self,
		"modifier_bloodseeker_thirst_custom_legendary_dash",
		{ x = point.x, y = point.y }
	)
end

modifier_bloodseeker_thirst_custom = class(mod_hidden)
function modifier_bloodseeker_thirst_custom:OnCreated()
	self.ability = self:GetAbility()
	self.parent = self:GetParent()
	self.ability.tracker = self
	self.ability:UpdateTalents()

	self.ability.min_bonus_pct = self.ability:GetSpecialValueFor("min_bonus_pct")
	self.ability.max_bonus_pct = self.ability:GetSpecialValueFor("max_bonus_pct")
	self.ability.bonus_movement_speed = self.ability:GetSpecialValueFor("bonus_movement_speed")
	self.ability.linger_duration = self.ability:GetSpecialValueFor("linger_duration")

	self.records = {}

	self.parent:AddDeathEvent(self, true)

	self.interval = 0.2
	self:StartIntervalThink(self.interval)
end

function modifier_bloodseeker_thirst_custom:OnRefresh(table)
	self.ability.bonus_movement_speed = self.ability:GetSpecialValueFor("bonus_movement_speed")
end

function modifier_bloodseeker_thirst_custom:GetBonus()
	if self.parent:PassivesDisabled() then
		return 0
	end
	local max_bonus_pct = self.ability.max_bonus_pct
		+ (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_thresh or 0)

	return math.max(0, (self:GetStackCount() / (self.ability.min_bonus_pct - max_bonus_pct)))
end

function modifier_bloodseeker_thirst_custom:OnIntervalThink()
	if not IsServer() then
		return
	end

	local low_health = self.ability.max_bonus_pct
		+ (self.ability.talents.has_e4 == 1 and self.ability.talents.e4_thresh or 0)
	local min_health = 100
	local target = nil
	local has_bonus = false
	local has_bloodrage = self.ability.talents.has_q7 == 1

	for _, player in pairs(players) do
		if
			(player:GetTeamNumber() ~= self.parent:GetTeamNumber() or (player == self.parent and has_bloodrage))
			and player:IsAlive()
		then
			local health = player:GetHealthPercent()
			if health < min_health then
				min_health = player:GetHealthPercent()
				target = player
			end

			if health <= low_health then
				has_bonus = true
				if
					self.parent:IsAlive()
					and not self.ability:IsStolen()
					and player:GetTeamNumber() ~= self.parent:GetTeamNumber()
				then
					player:AddNewModifier(self.parent, self.ability, "modifier_bloodseeker_thirst_custom_debuff", {})
				end
			elseif player:HasModifier("modifier_bloodseeker_thirst_custom_debuff") then
				player:RemoveModifierByName("modifier_bloodseeker_thirst_custom_debuff")
			end
		end
	end

	local bonus = 0
	if min_health < self.ability.min_bonus_pct then
		bonus = self.ability.min_bonus_pct - min_health
		if bonus > (self.ability.min_bonus_pct - low_health) then
			bonus = (self.ability.min_bonus_pct - low_health)
		end
	end

	if self.parent:HasModifier("modifier_bloodseeker_thirst_custom_kill") then
		bonus = (self.ability.min_bonus_pct - low_health)
	end

	self:SetStackCount(bonus)

	if has_bonus then
		if not self.parent:HasModifier("modifier_bloodseeker_thirst_custom_visual") then
			if self.parent:IsAlive() then
				CustomGameEventManager:Send_ServerToPlayer(
					PlayerResource:GetPlayer(self.parent:GetPlayerOwnerID()),
					"generic_sound",
					{ sound = "bloodseeker_blod_ability_thirst_0" .. math.random(1, 3) }
				)
			end
			self.parent:AddNewModifier(self.parent, self.ability, "modifier_bloodseeker_thirst_custom_visual", {})
		end
	else
		self.parent:RemoveModifierByName("modifier_bloodseeker_thirst_custom_visual")
	end

	if self.ability.talents.has_e7 == 1 then
		self.parent:UpdateUIlong({
			max = 100,
			stack = 100 - min_health,
			override_stack = tostring(math.floor(100 - min_health)) .. "%",
			priority = 2,
			style = "BloodseekerThirst",
		})
		if self.ability:GetCooldownTimeRemaining() > 0 and min_health <= self.ability.talents.e7_health then
			local cd_inc = self.interval * (self.ability.talents.e7_cd_inc - 1)
			self.parent:CdAbility(self.ability, cd_inc, nil, "modifier_bloodseeker_thirst_7")
		end
	end
end

function modifier_bloodseeker_thirst_custom:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
		MODIFIER_PROPERTY_MOVESPEED_BONUS_CONSTANT,
		MODIFIER_PROPERTY_MOVESPEED_MAX,
		MODIFIER_PROPERTY_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
		MODIFIER_PROPERTY_PREATTACK_CRITICALSTRIKE,
		MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE,
	}
end

function modifier_bloodseeker_thirst_custom:GetModifierMoveSpeedBonus_Percentage(params)
	return self:GetBonus() * self.ability.bonus_movement_speed
end

function modifier_bloodseeker_thirst_custom:GetModifierMoveSpeedBonus_Constant()
	return self.ability.talents.e2_move
end

function modifier_bloodseeker_thirst_custom:GetModifierPreAttack_BonusDamage()
	return math.min(
		self.ability.talents.e1_max,
		self.parent:GetMoveSpeedModifier(self.parent:GetBaseMoveSpeed(), false)
	) * self.ability.talents.e1_damage
end

function modifier_bloodseeker_thirst_custom:GetModifierMoveSpeed_Max(params)
	return 30000
end

function modifier_bloodseeker_thirst_custom:GetModifierMoveSpeed_Limit(params)
	return 30000
end

function modifier_bloodseeker_thirst_custom:GetModifierIgnoreMovespeedLimit(params)
	return 1
end

function modifier_bloodseeker_thirst_custom:GetCritChance()
	if self.ability.talents.has_e3 == 0 then
		return 0
	end
	return 100 / self.ability.talents.e3_count
end

function modifier_bloodseeker_thirst_custom:GetCritDamage()
	if self.ability.talents.has_e3 == 0 then
		return
	end
	return self.ability.talents.e3_damage
end

function modifier_bloodseeker_thirst_custom:GetModifierPreAttack_CriticalStrike(params)
	if not IsServer() then
		return
	end
	local target = params.target

	if not target:IsUnit() then
		return
	end
	if self.ability.talents.has_e3 == 0 then
		return
	end

	local mod = target:FindModifierByName("modifier_bloodseeker_thirst_custom_crit_count")
	if not mod or not mod.count then
		return
	end

	local max = target:GetHealthPercent() <= self.ability.talents.e3_health and self.ability.talents.e3_count_inc
		or self.ability.talents.e3_count
	if mod.count < max - 1 then
		return
	end

	self.records[params.record] = true
	return self:GetCritDamage()
end

function modifier_bloodseeker_thirst_custom:RecordDestroyEvent(params)
	if not IsServer() then
		return
	end
	if not self.records[params.record] then
		return
	end
	self.records[params.record] = nil
end

function modifier_bloodseeker_thirst_custom:DamageEvent_out(params)
	if not IsServer() then
		return
	end
	if self.parent ~= params.attacker then
		return
	end
	if not params.unit:IsUnit() then
		return
	end

	local target = params.unit

	if
		self.ability.talents.has_h5 == 1
		and (not params.inflictor or (not params.inflictor:IsItem() and params.inflictor:GetName() ~= "custom_ability_dust"))
		and target:IsRealHero()
		and target:GetTeamNumber() ~= self.parent:GetTeamNumber()
	then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_bloodseeker_thirst_custom_vision",
			{ duration = self.ability.talents.h5_duration }
		)
	end
end

function modifier_bloodseeker_thirst_custom:AttackRecordEvent_out(params)
	if not IsServer() then
		return
	end
	if params.attacker ~= self.parent then
		return
	end
	if not params.target:IsUnit() then
		return
	end

	local target = params.target
	if self.ability.talents.has_e4 == 1 then
		if target:GetHealthPercent() <= self.ability.talents.e4_health then
			self.parent:AddNewModifier(
				self.parent,
				self.ability,
				"modifier_bloodseeker_thirst_custom_unmiss",
				{ duration = 1 }
			)
		elseif self.parent:HasModifier("modifier_bloodseeker_thirst_custom_unmiss") then
			self.parent:RemoveModifierByName("modifier_bloodseeker_thirst_custom_unmiss")
		end
	end
end

function modifier_bloodseeker_thirst_custom:GetProcChance(params, name)
	if name ~= "bash" then
		return 100
	end
	if params.target:GetHealthPercent() > self.ability.talents.e4_health then
		return 0
	end
	if params.target:HasModifier("modifier_bloodseeker_thirst_custom_bash_cd") then
		return 0
	end
	return 100
end

function modifier_bloodseeker_thirst_custom:AttackProc(params, name)
	local target = params.target

	if self.ability.talents.has_e2 == 1 then
		DoCleaveAttack(
			self.parent,
			target,
			self.ability,
			self.ability.talents.e2_cleave * params.damage,
			150,
			360,
			650,
			"particles/bloodseeker/thirst_cleave.vpcf"
		)
	end
end

function modifier_bloodseeker_thirst_custom:DamageProc(params, name)
	local target = params.target

	if name == "bash" then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_bloodseeker_thirst_custom_bash_cd",
			{ duration = self.ability.talents.e4_talent_cd }
		)
		target:AddNewModifier(
			self.parent,
			self.parent:BkbAbility(self.ability, true),
			"modifier_bashed",
			{ duration = (1 - target:GetStatusResistance()) * self.ability.talents.e4_stun }
		)
		target:EmitSound("BS.Thirst_bash")
		return
	end

	if not self.records[params.record] then
		target:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_bloodseeker_thirst_custom_crit_count",
			{ duration = self.ability.talents.e3_duration }
		)
		return
	end

	target:EmitSound("BS.Thirst_attack")
	target:EmitSound("BS.Thirst_attack2")

	local vec = (target:GetAbsOrigin() - self.parent:GetAbsOrigin()):Normalized()
	vec.z = 0
	local particle_edge_fx =
		ParticleManager:CreateParticle("particles/bloodseeker/thirst_crit.vpcf", PATTACH_CUSTOMORIGIN_FOLLOW, target)
	ParticleManager:SetParticleControlEnt(
		particle_edge_fx,
		0,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle_edge_fx,
		1,
		target,
		PATTACH_POINT_FOLLOW,
		"attach_hitloc",
		target:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlForward(particle_edge_fx, 2, vec)
	ParticleManager:SetParticleControl(
		particle_edge_fx,
		5,
		self.parent:GetAttachmentOrigin(self.parent:ScriptLookupAttachment("attach_hitloc"))
	)
	ParticleManager:SetParticleControlForward(particle_edge_fx, 5, vec)
	ParticleManager:ReleaseParticleIndex(particle_edge_fx)

	target:RemoveModifierByName("modifier_bloodseeker_thirst_custom_crit_count")
end

function modifier_bloodseeker_thirst_custom:DeathEvent(params)
	if params.unit:GetTeamNumber() == self.parent:GetTeamNumber() then
		return
	end
	if params.unit == self.parent then
		return
	end

	local target = params.unit

	if params.unit:IsRealHero() and not params.unit:IsReincarnating() then
		self.parent:AddNewModifier(
			self.parent,
			self.ability,
			"modifier_bloodseeker_thirst_custom_kill",
			{ duration = self.ability.linger_duration }
		)
	end

	if
		target:IsValidKill(self.parent)
		and (
			self.parent == params.attacker
			or (self.parent:GetAbsOrigin() - target:GetAbsOrigin()):Length2D() <= self.ability.talents.h5_radius
		)
	then
		self.parent:AddNewModifier(self.parent, self.ability, "modifier_bloodseeker_thirst_custom_cdr", {})
	end
end

function modifier_bloodseeker_thirst_custom:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveModifierByName("modifier_bloodseeker_thirst_custom_visual")
end

modifier_bloodseeker_thirst_custom_debuff = class(mod_visible)
function modifier_bloodseeker_thirst_custom_debuff:GetStatusEffectName()
	return "particles/units/heroes/hero_bloodseeker/bloodseeker_vision.vpcf"
end
function modifier_bloodseeker_thirst_custom_debuff:OnCreated()
	if not IsServer() then
		return
	end
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()
	self.interval = 0.2
	self:StartIntervalThink(self.interval)
end

function modifier_bloodseeker_thirst_custom_debuff:OnIntervalThink()
	if not IsServer() then
		return
	end
	AddFOWViewer(self.caster:GetTeamNumber(), self.parent:GetAbsOrigin(), 75, self.interval * 2, false)
	self.parent:AddNewModifier(self.caster, self.ability, "modifier_truesight", { duration = self.interval * 2 })
end

modifier_bloodseeker_thirst_custom_visual = class(mod_visible)
function modifier_bloodseeker_thirst_custom_visual:GetStatusEffectName()
	return "particles/status_fx/status_effect_thirst_vision.vpcf"
end
function modifier_bloodseeker_thirst_custom_visual:StatusEffectPriority()
	return MODIFIER_PRIORITY_NORMAL
end
function modifier_bloodseeker_thirst_custom_visual:OnCreated()
	self.parent = self:GetParent()
	if not IsServer() then
		return
	end

	local effect = wearables_system:GetParticleReplacementAbility(
		self.parent,
		"particles/units/heroes/hero_bloodseeker/bloodseeker_thirst_owner.vpcf",
		self
	)
	self.parent:GenericParticle(effect, self)

	local bloodseeker_head = self.parent:GetItemWearableHandle("head")
	if
		bloodseeker_head
		and bloodseeker_head:GetModelName()
			== "models/items/blood_seeker/bloodseeker_immortal_head/bloodseeker_immortal_head.vmdl"
	then
		local particle = ParticleManager:CreateParticle(
			"particles/econ/items/bloodseeker/bloodseeker_ti7/bloodseeker_thirst_stacks_ti7.vpcf",
			PATTACH_ABSORIGIN_FOLLOW,
			bloodseeker_head
		)
		ParticleManager:SetParticleControlEnt(
			particle,
			1,
			bloodseeker_head,
			PATTACH_POINT_FOLLOW,
			"attach_head",
			bloodseeker_head:GetAbsOrigin(),
			true
		)
		ParticleManager:SetParticleControl(particle, 2, Vector(150, 0, 0))
		self:AddParticle(particle, false, false, -1, false, false)
	end
end

function modifier_bloodseeker_thirst_custom_visual:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_bloodseeker_thirst_custom_visual:GetActivityTranslationModifiers()
	if self.parent:HasModifier("modifier_bloodseeker_thirst_custom_legendary_dash") then
		return
	end
	return "thirst"
end

modifier_bloodseeker_thirst_custom_kill = class(mod_hidden)

modifier_bloodseeker_thirst_custom_cdr = class({})
function modifier_bloodseeker_thirst_custom_cdr:IsHidden()
	return self.ability.talents.has_h5 == 0 or self:GetStackCount() >= self.ability.talents.h5_max
end
function modifier_bloodseeker_thirst_custom_cdr:IsPurgable()
	return false
end
function modifier_bloodseeker_thirst_custom_cdr:RemoveOnDeath()
	return false
end
function modifier_bloodseeker_thirst_custom_cdr:GetTexture()
	return "buffs/bloodseeker/hero_7"
end
function modifier_bloodseeker_thirst_custom_cdr:OnCreated()
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	self.max = self.ability.talents.h5_max

	if not IsServer() then
		return
	end
	self:StartIntervalThink(2)
	self:OnRefresh()
end

function modifier_bloodseeker_thirst_custom_cdr:OnRefresh()
	if not IsServer() then
		return
	end
	if self:GetStackCount() >= self.max then
		return
	end
	self:IncrementStackCount()

	self.parent:CalculateStatBonus(true)
end

function modifier_bloodseeker_thirst_custom_cdr:OnIntervalThink()
	if not IsServer() then
		return
	end
	if self.ability.talents.has_h5 == 0 then
		return
	end
	if self:GetStackCount() < self.max then
		return
	end

	self.parent:GenericParticle("particles/bristleback/brist_lowhp_.vpcf")
	self.parent:EmitSound("BS.Thirst_legendary_active")
	self:StartIntervalThink(-1)
end

function modifier_bloodseeker_thirst_custom_cdr:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_EXTRA_HEALTH_PERCENTAGE,
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
		MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
	}
end

function modifier_bloodseeker_thirst_custom_cdr:GetModifierExtraHealthPercentage()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return (self.ability.talents.h5_health / self.max) * self:GetStackCount()
end

function modifier_bloodseeker_thirst_custom_cdr:GetModifierDamageOutgoing_Percentage()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return (self.ability.talents.h5_damage / self.max) * self:GetStackCount()
end

function modifier_bloodseeker_thirst_custom_cdr:GetModifierSpellAmplify_Percentage()
	if self.ability.talents.has_h5 == 0 then
		return
	end
	return (self.ability.talents.h5_damage / self.max) * self:GetStackCount()
end

modifier_bloodseeker_thirst_custom_legendary_dash = class(mod_hidden)
function modifier_bloodseeker_thirst_custom_legendary_dash:GetStatusEffectName()
	return "particles/status_fx/status_effect_grimstroke_ink_swell.vpcf"
end
function modifier_bloodseeker_thirst_custom_legendary_dash:StatusEffectPriority()
	return MODIFIER_PRIORITY_ULTRA
end
function modifier_bloodseeker_thirst_custom_legendary_dash:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()

	if not IsServer() then
		return
	end
	self.parent:GenericParticle("particles/bloodseeker/thirst_dash.vpcf", self)
	self.parent:RemoveModifierByName("modifier_bloodseeker_thirst_custom_unmiss")

	self.radius = 170
	self.speed = self.ability.talents.e7_speed
	self.point = GetGroundPosition(Vector(table.x, table.y, 0), nil)
	self.dir = self.point - self.parent:GetAbsOrigin()
	self:SetDuration(self.dir:Length2D() / self.speed, false)

	self.parent:StartGesture(ACT_DOTA_RUN)

	self.targets = {}

	if not self:ApplyHorizontalMotionController() then
		self:Destroy()
		return
	end
end

function modifier_bloodseeker_thirst_custom_legendary_dash:UpdateHorizontalMotion(me, dt)
	if self.parent:IsStunned() or self.parent:IsHexed() or self.parent:IsRooted() or self.parent:IsLeashed() then
		self:Destroy()
		return
	end

	local nextpos = me:GetOrigin() + self.dir:Normalized() * self.speed * dt
	local new_point = GetGroundPosition(nextpos, nil)
	me:SetOrigin(new_point)

	for _, target in pairs(self.parent:FindTargets(self.radius)) do
		if not self.targets[target] then
			self.targets[target] = true
			target:AddNewModifier(self.parent, self.ability, "modifier_bloodseeker_thirst_custom_legendary_attack", {})
		end
	end
end

function modifier_bloodseeker_thirst_custom_legendary_dash:OnHorizontalMotionInterrupted()
	self:Destroy()
end

function modifier_bloodseeker_thirst_custom_legendary_dash:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
		MODIFIER_PROPERTY_DISABLE_TURNING,
	}
end

function modifier_bloodseeker_thirst_custom_legendary_dash:GetActivityTranslationModifiers()
	return "haste"
end

function modifier_bloodseeker_thirst_custom_legendary_dash:GetModifierDisableTurning()
	return 1
end

function modifier_bloodseeker_thirst_custom_legendary_dash:CheckState()
	return {
		[MODIFIER_STATE_DISARMED] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_MUTED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
	}
end

function modifier_bloodseeker_thirst_custom_legendary_dash:OnDestroy()
	if not IsServer() then
		return
	end
	self.parent:RemoveHorizontalMotionController(self)

	self.parent:FacePoint()
	FindClearSpaceForUnit(self.parent, self.parent:GetAbsOrigin(), false)

	self.parent:RemoveGesture(ACT_DOTA_CAST_ABILITY_2)
	self.parent:RemoveGesture(ACT_DOTA_RUN)
end

modifier_bloodseeker_thirst_custom_legendary_attack = class(mod_hidden)
function modifier_bloodseeker_thirst_custom_legendary_attack:GetAttributes()
	return MODIFIER_ATTRIBUTE_MULTIPLE
end
function modifier_bloodseeker_thirst_custom_legendary_attack:OnCreated(table)
	self.parent = self:GetParent()
	self.ability = self:GetAbility()
	self.caster = self:GetCaster()

	if not IsServer() then
		return
	end

	self.attacker = self.caster
	local attacks = self.parent:IsHero() and self.ability.talents.e7_attacks or self.ability.talents.e7_attacks_creeps
	self:SetStackCount(attacks)

	self:OnIntervalThink()
end

function modifier_bloodseeker_thirst_custom_legendary_attack:OnIntervalThink()
	if not IsServer() then
		return
	end
	if not IsValid(self.attacker) or not self.attacker:IsAlive() then
		self:Destroy()
		return
	end

	local particle = ParticleManager:CreateParticle(
		"particles/bloodseeker/thirst_dash_damage.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		self.parent
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		0,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:SetParticleControlEnt(
		particle,
		1,
		self.parent,
		PATTACH_ABSORIGIN_FOLLOW,
		"attach_hitloc",
		self.parent:GetAbsOrigin(),
		true
	)
	ParticleManager:ReleaseParticleIndex(particle)

	local un_miss = self.ability.talents.has_e4 == 1
		and self.parent:GetHealthPercent() <= self.ability.talents.e4_health
	self.attacker:AddNewModifier(
		self.caster,
		self.ability,
		"modifier_bloodseeker_thirst_custom_legendary_attack_damage",
		{ duration = FrameTime() }
	)
	self.attacker:PerformAttack(self.parent, false, true, true, true, false, false, un_miss)
	self.attacker:RemoveModifierByName("modifier_bloodseeker_thirst_custom_legendary_attack_damage")
	self.parent:EmitSound("Bloodseeker.Thirst_legendary_attack")

	self:DecrementStackCount()
	if self:GetStackCount() <= 0 then
		self:Destroy()
		return
	end

	self:StartIntervalThink(self.ability.talents.e7_delay)
end

function modifier_bloodseeker_thirst_custom_legendary_attack:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
	}
end

function modifier_bloodseeker_thirst_custom_legendary_attack:GetModifierMoveSpeedBonus_Percentage()
	return -100
end

modifier_bloodseeker_thirst_custom_legendary_attack_damage = class(mod_hidden)
function modifier_bloodseeker_thirst_custom_legendary_attack_damage:OnCreated()
	self.ability = self:GetAbility()
	self.damage = self.ability.talents.e7_damage - 100
end

function modifier_bloodseeker_thirst_custom_legendary_attack_damage:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE,
	}
end

function modifier_bloodseeker_thirst_custom_legendary_attack_damage:GetModifierDamageOutgoing_Percentage()
	return self.damage
end

modifier_bloodseeker_thirst_custom_vision = class(mod_visible)
function modifier_bloodseeker_thirst_custom_vision:IsHidden()
	return self.parent:HasModifier("modifier_bloodseeker_thirst_custom_debuff")
end
function modifier_bloodseeker_thirst_custom_vision:GetTexture()
	return "buffs/bloodseeker/hero_7"
end
function modifier_bloodseeker_thirst_custom_vision:OnCreated(table)
	self.caster_team = self:GetCaster():GetTeamNumber()
	self.parent = self:GetParent()

	if not IsServer() then
		return
	end
	self.interval = 0.4
	self.RemoveForDuel = true

	self:OnIntervalThink()
	self:StartIntervalThink(self.interval)
end

function modifier_bloodseeker_thirst_custom_vision:OnIntervalThink()
	if not IsServer() then
		return
	end

	AddFOWViewer(self.caster_team, self.parent:GetAbsOrigin(), 10, self.interval + 0.1, false)
end

modifier_bloodseeker_thirst_custom_unmiss = class(mod_hidden)
function modifier_bloodseeker_thirst_custom_unmiss:OnCreated()
	self.parent = self:GetParent()
end

function modifier_bloodseeker_thirst_custom_unmiss:CheckState()
	if self.parent:HasModifier("modifier_bloodseeker_thirst_custom_legendary_attack") then
		return
	end
	return {
		[MODIFIER_STATE_CANNOT_MISS] = true,
	}
end

modifier_bloodseeker_thirst_custom_bash_cd = class(mod_hidden)

modifier_bloodseeker_thirst_custom_crit_count = class(mod_hidden)
function modifier_bloodseeker_thirst_custom_crit_count:OnCreated()
	self.parent = self:GetParent()
	self.caster = self:GetCaster()
	self.ability = self:GetAbility()

	self.count = 0
	self.max = self.ability.talents.e3_count
	if not IsServer() then
		return
	end
	self:OnRefresh()
end

function modifier_bloodseeker_thirst_custom_crit_count:OnRefresh()
	if not IsServer() then
		return
	end
	if self.count >= self.max then
		return
	end
	self.count = self.count + 1
end