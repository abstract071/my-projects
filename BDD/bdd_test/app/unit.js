/**
 * Created by Vladyslav_Mykhailenk on 11/28/2014.
 */
define(function (require) {
    var Unit = function () {
        this.health = 100;
        this.damage = 20;
    };

    Unit.prototype = {
        constructor: Unit,

        getHealth: function () {
            return this.health;
        },

        getDamage: function () {
            return this.damage;
        },

        setHealth: function (health) {
            this.health = health;
        },

        setDamage: function (damage) {
            this.damage = damage;
        }
    };

    return Unit;
});